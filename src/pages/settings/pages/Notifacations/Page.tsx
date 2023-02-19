import React, { FC } from "react";
import { View } from "react-native";
import { makeStyles } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@components/index";
import { TopPanel } from "@widgets/top-panel/index";
import { Routes } from "@pages/index";

interface Props {
    navigation: any;
    route: any;
}

const Notifacations: FC<Props> = function ({ navigation }) {
    const styles = useStyles();
    const insets = useSafeAreaInsets();

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
                isBackNavigation
                navigation={navigation}
                routeName={Routes.Settings}
            />

            <Text h3 bold>
                Notifacations
            </Text>
        </View>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.colors.backBackground,
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
    },
}));

export { Notifacations };
