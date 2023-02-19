import React, { useState, useEffect, FC } from "react";
import { View } from "react-native";
import {
    makeStyles,
    useTheme,
    Button,
} from "@rneui/themed";
import Geolocation, {
    GeolocationResponse,
} from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Region } from "react-native-maps";

import { Input, Icon } from "@components/index";
import {
    MY_LOCATION_BTN_KEY,
    MY_LOCATION_MAP_KEY,
} from "@utils/index";

interface Props {
    mapRegion?: Region;
    setBtnPosition: React.Dispatch<
        React.SetStateAction<
            GeolocationResponse | undefined
        >
    >;
}

const FindMe: FC<Props> = function ({
    mapRegion,
    setBtnPosition,
}) {
    const styles = useStyles();
    const { theme } = useTheme();

    const [onMyLocation, setOnMyLocation] = useState(false);

    const checkMyLocation = async (region?: Region) => {
        const position: GeolocationResponse =
            await AsyncStorage.getItem(
                MY_LOCATION_BTN_KEY,
            ).then(data => JSON.parse(data || ""));

        if (
            region &&
            Math.abs(
                +region?.latitude.toFixed(5) -
                    +position?.coords.latitude.toFixed(5),
            ) === 0 &&
            Math.abs(
                +region?.longitude.toFixed(5) -
                    +position?.coords.longitude.toFixed(5),
            ) === 0
        ) {
            setOnMyLocation(true);
        } else {
            setOnMyLocation(false);
        }
    };

    useEffect(() => {
        (async () => {
            const region: Region =
                await AsyncStorage.getItem(
                    MY_LOCATION_MAP_KEY,
                ).then(data => JSON.parse(data || ""));

            checkMyLocation(region);
        })();
    }, []);

    useEffect(() => {
        checkMyLocation(mapRegion);
    }, [mapRegion]);

    const saveCurrLocation = async (
        position: GeolocationResponse,
    ) => {
        await AsyncStorage.setItem(
            MY_LOCATION_BTN_KEY,
            JSON.stringify(position),
        );
    };

    const handlePress = () => {
        setOnMyLocation(true);

        Geolocation.getCurrentPosition(
            position => {
                setBtnPosition(position);

                saveCurrLocation(position);
            },
            error => console.log(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
            },
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <Input
                    style={styles.locationInput}
                    placeholder="Search for a city"
                    placeholderTextColor={
                        theme.colors.primary
                    }
                    leftIcon={
                        <Icon
                            type="materialicons"
                            name="location-pin"
                            size={22}
                        />
                    }
                />
            </View>
            <Button type="clear" onPress={handlePress}>
                <Icon
                    type="materialicons"
                    name={
                        onMyLocation
                            ? "my-location"
                            : "location-searching"
                    }
                    size={22}
                />
            </Button>
        </View>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.background,
        borderRadius: 12,
    },

    locationContainer: {
        flex: 1,
    },
    locationInput: {
        color: theme.colors.primary,
    },

    locationBtn: {
        marginLeft: 10,
    },
}));

export { FindMe };
