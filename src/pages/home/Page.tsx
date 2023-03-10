import React, { useEffect, FC } from "react";
import { View } from "react-native";
import { makeStyles } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FindMe, Map, Places } from "./ui";
import { Text } from "@components/index";
import { TopPanel } from "@widgets/top-panel/index";
import { Routes } from "@pages/index";
import { useAppDispatch } from "@hooks/index";
import { Region } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MY_LOCATION_MAP_KEY } from "@utils/index";
import { setCurrentRegion } from "@app/store/reducers/mapSlice";

interface Props {
    navigation: any;
}

const Home: FC<Props> = function ({ navigation }) {
    const dispatch = useAppDispatch();

    const styles = useStyles();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        (async () => {
            const localRegion: Region =
                await AsyncStorage.getItem(
                    MY_LOCATION_MAP_KEY,
                ).then(data => JSON.parse(data || ""));

            dispatch(setCurrentRegion(localRegion));
        })();
    }, [dispatch]);

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
                Weather
            </Text>

            <View style={styles.findme}>
                <FindMe navigation={navigation} />
            </View>

            <View style={styles.map}>
                <Map navigation={navigation} />
            </View>

            <View style={styles.places}>
                <Places navigation={navigation} />
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
    places: {},
}));

export { Home };
