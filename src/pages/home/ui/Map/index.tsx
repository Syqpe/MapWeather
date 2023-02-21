/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, FC } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { makeStyles } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, {
    Details,
    Region,
} from "react-native-maps";

import { MY_LOCATION_MAP_KEY } from "@utils/index";
import { Routes } from "@pages/index";
import { Icon } from "@components/index";
import {
    useAppDispatch,
    useAppSelector,
} from "@hooks/index";
import {
    selectCurrentRegion,
    setCurrentRegion,
} from "@app/store/reducers/mapSlice";

interface Props {
    navigation: any;
}

const Map: FC<Props> = function ({ navigation }) {
    const dispatch = useAppDispatch();
    const styles = useStyles();

    const mapRef = useRef<MapView>(null);
    const currentRegion: Region = useAppSelector(
        selectCurrentRegion,
    );

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
                    latitude: localRegion?.latitude,
                    longitude: localRegion?.longitude,
                    latitudeDelta:
                        localRegion?.latitudeDelta,
                    longitudeDelta:
                        localRegion?.longitudeDelta,
                } as Region);
            })();
        }
    }, [mapRef]);

    // Когда юзер устанавливает нажимает "Текущее положение"
    useEffect(() => {
        mapRef?.current?.animateToRegion({
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
        } as Region);
    }, [currentRegion]);

    const handleonRegionChangeComplete = (
        localRegion: Region,
        _: Details,
    ) => {
        saveCurrLocation(localRegion);

        dispatch(setCurrentRegion(localRegion));
    };

    const handlePress = () => {
        navigation.push(Routes.Weather);
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.map_container]}>
                <MapView
                    style={[styles.map]}
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

                <View
                    style={[
                        {
                            ...StyleSheet.absoluteFillObject,
                        },
                        styles.map_cover,
                    ]}
                />
                <TouchableOpacity
                    style={[
                        {
                            ...StyleSheet.absoluteFillObject,
                        },
                        styles.map_action,
                    ]}
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
    },

    map: {
        height: 160,
    },
    map_cover: {
        opacity: 0.5,
        backgroundColor: "#000",
    },
    map_action: {
        justifyContent: "center",
        alignItems: "center",
    },
}));

export { Map };
