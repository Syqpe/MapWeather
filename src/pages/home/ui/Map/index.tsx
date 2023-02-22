/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, FC } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { makeStyles } from "@rneui/themed";
import MapView from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppDispatch } from "@hooks/index";
import { Routes } from "@pages/index";
import { MY_LOCATION_MAP_KEY } from "@utils/index";
import { Icon } from "@components/index";
import { useAppSelector } from "@hooks/index";
import {
    addRegion,
    selectCurrentRegion,
} from "@app/store/reducers/mapSlice";
import { Region } from "@localtypes/index";

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

    // Когда юзер устанавливает нажимает "Текущее положение"
    useEffect(() => {
        mapRef?.current?.animateToRegion({
            latitude: currentRegion?.latitude,
            longitude: currentRegion?.longitude,
            latitudeDelta:
                currentRegion?.latitudeDelta || 0,
            longitudeDelta:
                currentRegion?.longitudeDelta || 0,
        });
    }, [currentRegion]);

    // * Функция для сохранения положения карты
    const handleonRegionChangeComplete = (
        localRegion: Region,
    ) => {
        saveCurrLocation(localRegion);
    };

    const handlePress = () => {
        dispatch(addRegion(currentRegion));

        navigation.push(Routes.Weather);
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.map_container]}>
                <MapView
                    style={[styles.map]}
                    initialRegion={{
                        latitude: currentRegion?.latitude,
                        longitude: currentRegion?.longitude,
                        latitudeDelta:
                            currentRegion?.latitudeDelta ||
                            0,
                        longitudeDelta:
                            currentRegion?.longitudeDelta ||
                            0,
                    }}
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
