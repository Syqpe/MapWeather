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
import { fetch } from "@API";

import { Input, Icon, Button } from "@components/index";
import { MY_LOCATION_BTN_KEY } from "@utils/index";
import { Routes } from "@pages/index";
import {
    useAppDispatch,
    useAppSelector,
} from "@hooks/index";
import {
    addRegion,
    selectCurrentRegion,
    setCurrentRegion,
} from "@app/store/reducers/mapSlice";
import {
    ISuggestItem,
    Region,
    isSuccessResponse,
} from "@localtypes/index";

interface Props {
    navigation: any;
}

const FindMe: FC<Props> = function ({ navigation }) {
    const dispatch = useAppDispatch();

    const styles = useStyles();
    const { theme } = useTheme();

    const currentRegion: Region = useAppSelector(
        selectCurrentRegion,
    );

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
        checkMyLocation(currentRegion);
    }, [currentRegion]);

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
            if (isSuccessResponse(data)) {
                setSuggestItems(data);
            }
        });
    };

    // * Поиск гео-локации
    const handleChangeText = (localText: string) => {
        setText(localText);

        clearTimeout(timer || 0);

        const localTimer = setTimeout(() => {
            getSuggestItems(localText);
        }, 600);

        setTimer(localTimer);
    };

    // * Нажатие на поиск моей гео-локации
    const handleGetMyLocationPress = () => {
        setOnMyLocation(true);

        Geolocation.getCurrentPosition(
            async position => {
                const region: Region = {
                    latitude: 0,
                    longitude: 0,
                };

                await fetch<Array<ISuggestItem>>(
                    "/search.json",
                    {
                        params: {
                            q: `${position.coords.latitude},${position.coords.longitude}`,
                        },
                    },
                ).then(data => {
                    if (isSuccessResponse(data)) {
                        region.name = data[0].name;
                        region.country = data[0].country;
                        region.region = data[0].region;
                    }
                });

                dispatch(addRegion(region));

                dispatch(setCurrentRegion(region));

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

    // * Нажатие на саджест
    const handleSuggestItemPress = (
        suggestItem: ISuggestItem,
    ) => {
        const region: Region = {
            latitude: suggestItem.lat,
            longitude: suggestItem.lon,

            name: suggestItem.name,
            country: suggestItem.country,
            region: suggestItem.region,
        };

        dispatch(addRegion(region));

        dispatch(setCurrentRegion(region));

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
                <Button
                    type="clear"
                    onPress={handleGetMyLocationPress}
                >
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

            {suggestItems.length ? (
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
                                        {
                                            suggestItem.country
                                        }
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        </TouchableHighlight>
                    ))}
                </View>
            ) : null}
        </View>
    );
};

const useStyles = makeStyles(theme => ({
    container: {},

    search_container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.background,
        borderRadius: 12,
    },

    suggest_container: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        borderBottomEndRadius: 16,
        borderBottomStartRadius: 16,
        zIndex: 99,
    },

    location_container: {
        flex: 1,
    },
    location_input: {
        color: theme.colors.primary,
    },
}));

export { FindMe };
