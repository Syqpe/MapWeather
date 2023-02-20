import React, { useState, useEffect, FC } from "react";
import { TouchableHighlight, View } from "react-native";
import {
    ListItem,
    makeStyles,
    useTheme,
} from "@rneui/themed";
import Geolocation, {
    GeolocationResponse,
} from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Region } from "react-native-maps";
import { fetch } from "@API";

import { Input, Icon, Button } from "@components/index";
import {
    MY_LOCATION_BTN_KEY,
    MY_LOCATION_MAP_KEY,
} from "@utils/index";
import { Routes } from "@pages/index";

interface ISuggestItem {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}

interface Props {
    region?: Region;
    setRegion: React.Dispatch<
        React.SetStateAction<Region | undefined>
    >;
    navigation: any;
}

const FindMe: FC<Props> = function ({
    region,
    setRegion,
    navigation,
}) {
    const styles = useStyles();
    const { theme } = useTheme();

    const [text, setText] = useState<string>("");
    const [suggestItems, setSuggestItems] = useState<
        Array<ISuggestItem>
    >([]);
    const [timer, setTimer] = useState<number>();
    const [onMyLocation, setOnMyLocation] = useState(false);

    const checkMyLocation = async (
        localRegion?: Region,
    ) => {
        const position: GeolocationResponse =
            await AsyncStorage.getItem(
                MY_LOCATION_BTN_KEY,
            ).then(data => JSON.parse(data || ""));

        if (
            localRegion &&
            Math.abs(
                +localRegion?.latitude.toFixed(5) -
                    +position?.coords.latitude.toFixed(5),
            ) === 0 &&
            Math.abs(
                +localRegion?.longitude.toFixed(5) -
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
            const localRegion: Region =
                await AsyncStorage.getItem(
                    MY_LOCATION_MAP_KEY,
                ).then(data => JSON.parse(data || ""));

            checkMyLocation(localRegion);
        })();
    }, []);

    useEffect(() => {
        checkMyLocation(region);
    }, [region]);

    const saveCurrLocation = async (
        position: GeolocationResponse,
    ) => {
        await AsyncStorage.setItem(
            MY_LOCATION_BTN_KEY,
            JSON.stringify(position),
        );
    };

    const getSuggestItems = (localText: string) => {
        fetch<Array<ISuggestItem>>("/search.json", {
            params: {
                q: localText,
            },
        }).then(data => {
            setSuggestItems(
                data as unknown as Array<ISuggestItem>,
            );
        });
    };

    const handleChangeText = (localText: string) => {
        setText(localText);

        clearTimeout(timer || 0);

        const localTimer = setTimeout(() => {
            getSuggestItems(localText);
        }, 600);

        setTimer(localTimer);
    };

    const handlePress = () => {
        setOnMyLocation(true);

        Geolocation.getCurrentPosition(
            position => {
                setRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                } as Region);

                saveCurrLocation(position);

                navigation.push(Routes.Weather);
            },
            error => console.log(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
            },
        );
    };

    const handleSuggestItemPress = (
        suggestItem: ISuggestItem,
    ) => {
        setRegion({
            latitude: suggestItem.lat,
            longitude: suggestItem.lon,
        } as Region);

        setText("");
        setSuggestItems([]);

        navigation.push(Routes.Weather);
    };

    return (
        <View style={styles.container}>
            <View style={styles.search_container}>
                <View style={styles.location_container}>
                    <Input
                        style={styles.location_input}
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
                        value={text}
                        onChangeText={handleChangeText}
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

            <View style={styles.suggest_container}>
                {suggestItems.map((suggestItem, i) => (
                    <TouchableHighlight
                        onPress={() =>
                            handleSuggestItemPress(
                                suggestItem,
                            )
                        }
                        key={i}
                    >
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title>
                                    {suggestItem.name}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    {suggestItem.country}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableHighlight>
                ))}
            </View>
        </View>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        position: "relative",
    },

    search_container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.background,
        borderRadius: 12,
    },

    suggest_container: {
        // position: "absolute",
        // top: "100%",
        // left: 0,
        // right: 0,
        backgroundColor: "green",
        height: 400,
        borderBottomEndRadius: 16,
        borderBottomStartRadius: 16,
    },

    location_container: {
        flex: 1,
    },
    location_input: {
        color: theme.colors.primary,
    },
}));

export { FindMe };
