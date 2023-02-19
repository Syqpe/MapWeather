import React, { FC } from "react";
import { View } from "react-native";
import { Text, useTheme, makeStyles } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
    navigation: any;
    route: any;
}

const Notifacations: FC<Props> = function (props) {
    const styles = useStyles(props);
    const { theme } = useTheme();
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
            <Text
                h3
                style={{
                    color: theme.colors.primary,
                    fontWeight: "bold",
                }}
            >
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
