import React, { useState, FC } from "react";
import { View } from "react-native";
import { makeStyles, useTheme } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { GeolocationResponse } from "@react-native-community/geolocation";
import { Region } from "react-native-maps";

import { FindMe, Map } from "./ui";
import { Text } from "@components/index";
import { TopPanel } from "@widgets/top-panel/index";
import { Routes } from "../index";

interface Props {
    navigation: any;
}

const Home: FC<Props> = function ({ navigation }) {
    const styles = useStyles();
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    const { status, data } = useQuery("?q=London&aqi=no", {
        staleTime: 60 * 1000 * 10, // 5min
    });

    // Позиция по кнопке
    const [btnPositon, setBtnPosition] =
        useState<GeolocationResponse>();

    // Позиция по карте
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
            <TopPanel
                iconName="settings-outline"
                navigation={navigation}
                routeName={Routes.Settings}
            />

            <Text h3 bold>
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
