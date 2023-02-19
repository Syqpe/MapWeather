/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, FC, useEffect } from "react";
import { View } from "react-native";
import { makeStyles } from "@rneui/themed";
import { GeolocationResponse } from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, {
    Details,
    Region,
} from "react-native-maps";

import { MY_LOCATION_MAP_KEY } from "@utils/index";

interface Props {
    btnPositon: GeolocationResponse | undefined;
    setMapRegion: React.Dispatch<
        React.SetStateAction<Region | undefined>
    >;
}

const MAP_CONFIG = {
    latitude: 12,
    longitude: 12,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0221,
};

const Map: FC<Props> = function ({
    btnPositon,
    setMapRegion,
}) {
    const styles = useStyles();

    const mapRef = useRef<MapView>(null);

    const saveCurrLocation = async (region: Region) => {
        await AsyncStorage.setItem(
            MY_LOCATION_MAP_KEY,
            JSON.stringify(region),
        );
    };

    // При 1 входе, показываем сохраненные данные
    useEffect(() => {
        if (mapRef?.current) {
            (async () => {
                const region: Region =
                    await AsyncStorage.getItem(
                        MY_LOCATION_MAP_KEY,
                    ).then(data => JSON.parse(data || ""));

                mapRef?.current?.animateToRegion({
                    latitude:
                        region?.latitude ||
                        MAP_CONFIG.latitude,
                    longitude:
                        region?.longitude ||
                        MAP_CONFIG.longitude,
                    latitudeDelta:
                        region?.latitudeDelta ||
                        MAP_CONFIG.latitudeDelta,
                    longitudeDelta:
                        region?.longitudeDelta ||
                        MAP_CONFIG.longitudeDelta,
                } as Region);
            })();
        }
    }, [mapRef]);

    // Когда юзер устанавливает нажимает "Текущее положение"
    useEffect(() => {
        mapRef?.current?.animateToRegion({
            latitude:
                btnPositon?.coords.latitude ||
                MAP_CONFIG.latitude,
            longitude:
                btnPositon?.coords.longitude ||
                MAP_CONFIG.longitude,
        } as Region);
    }, [btnPositon]);

    const handleonRegionChangeComplete = (
        region: Region,
        _: Details,
    ) => {
        saveCurrLocation(region);

        setMapRegion(region);
    };

    return (
        <View style={[styles.container]}>
            <MapView
                ref={mapRef}
                showsUserLocation
                showsCompass
                zoomEnabled
                zoomControlEnabled
                showsTraffic
                style={styles.map}
                onRegionChangeComplete={
                    handleonRegionChangeComplete
                }
            />
        </View>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.background,
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        height: 160,
    },

    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
    },
}));

export { Map };
