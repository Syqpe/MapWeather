/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { makeStyles } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, {
    Details,
    Region,
} from "react-native-maps";

import { MY_LOCATION_MAP_KEY } from "@utils/index";
import { Routes } from "@pages/index";
import { Icon } from "@components/index";

interface Props {
    region: Region | undefined;
    setRegion: React.Dispatch<
        React.SetStateAction<Region | undefined>
    >;
    navigation: any;
}

const MAP_CONFIG = {
    latitude: 12,
    longitude: 12,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0221,
};

const Map: FC<Props> = function ({
    region,
    setRegion,
    navigation,
}) {
    const styles = useStyles();

    const mapRef = useRef<MapView>(null);

    const saveCurrLocation = async (
        localRegion: Region,
    ) => {
        await AsyncStorage.setItem(
            MY_LOCATION_MAP_KEY,
            JSON.stringify(localRegion),
        );
    };

    // При 1 входе, показываем сохраненные данные
    useEffect(() => {
        if (mapRef?.current) {
            (async () => {
                const localRegion: Region =
                    await AsyncStorage.getItem(
                        MY_LOCATION_MAP_KEY,
                    ).then(data => JSON.parse(data || ""));

                mapRef?.current?.animateToRegion({
                    latitude:
                        localRegion?.latitude ||
                        MAP_CONFIG.latitude,
                    longitude:
                        localRegion?.longitude ||
                        MAP_CONFIG.longitude,
                    latitudeDelta:
                        localRegion?.latitudeDelta ||
                        MAP_CONFIG.latitudeDelta,
                    longitudeDelta:
                        localRegion?.longitudeDelta ||
                        MAP_CONFIG.longitudeDelta,
                } as Region);
            })();
        }
    }, [mapRef]);

    // Когда юзер устанавливает нажимает "Текущее положение"
    useEffect(() => {
        mapRef?.current?.animateToRegion({
            latitude: region?.latitude,
            longitude: region?.longitude,
        } as Region);
    }, [region]);

    const handleonRegionChangeComplete = (
        localRegion: Region,
        _: Details,
    ) => {
        saveCurrLocation(localRegion);

        setRegion(localRegion);
    };

    const handlePress = () => {
        navigation.push(Routes.Weather);
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.map_container]}>
                <MapView
                    style={styles.map}
                    ref={mapRef}
                    showsUserLocation
                    showsCompass
                    zoomEnabled
                    zoomControlEnabled
                    showsTraffic
                    onRegionChangeComplete={
                        handleonRegionChangeComplete
                    }
                />

                <View style={[styles.map_cover]} />
                <TouchableOpacity
                    style={styles.map_action}
                    onPress={handlePress}
                >
                    <Icon
                        type="ionicon"
                        name="map-outline"
                        size={38}
                        color={"#fff"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const useStyles = makeStyles(() => ({
    container: {},

    map_container: {
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
        height: 160,
        marginBottom: 4,
    },

    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        zIndex: 1,
    },
    map_cover: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        zIndex: 2,
        opacity: 0.5,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    map_action: {
        flex: 1,
        zIndex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
}));

export { Map };
