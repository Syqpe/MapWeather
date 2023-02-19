import React, { useState, FC } from "react";
import { View } from "react-native";
import { makeStyles, useTheme, Text } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { GeolocationResponse } from "@react-native-community/geolocation";
import { Region } from "react-native-maps";

import { FindMe, Map } from "./ui";

interface Props {
    navigation: any;
}

const Home: FC<Props> = function ({}) {
    const styles = useStyles();
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    const { status, data } = useQuery("?q=London&aqi=no", {
        staleTime: 60 * 1000 * 10, // 5min
    });

    // Общий позишин между кнопкой и картой
    // кнопка -> карта
    const [btnPositon, setBtnPosition] =
        useState<GeolocationResponse>();

    const [mapRegion, setMapRegion] = useState<Region>();

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop:
                        insets.top ||
                        styles.container.paddingTop,
                    paddingBottom:
                        insets.bottom ||
                        styles.container.paddingBottom,
                    paddingLeft:
                        insets.left ||
                        styles.container.paddingLeft,
                    paddingRight:
                        insets.right ||
                        styles.container.paddingRight,
                },
            ]}
        >
            <Text
                h3
                style={{
                    color: theme.colors.primary,
                    fontWeight: "bold",
                }}
            >
                Weather Map
            </Text>

            <View style={styles.findme}>
                <FindMe
                    mapRegion={mapRegion}
                    setBtnPosition={setBtnPosition}
                />
            </View>

            <View style={styles.map}>
                <Map
                    btnPositon={btnPositon}
                    setMapRegion={setMapRegion}
                />
            </View>
        </View>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.colors.backBackground,
        width: "100%",
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
    },
    findme: {
        marginVertical: 10,
    },
    map: {},
}));

export { Home };
