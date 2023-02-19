import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { makeStyles } from "@rneui/themed";

import { Icon } from "@components/index";

type ISide = "left" | "right";

interface Props {
    iconName?: string;
    routeName: string;
    side?: ISide;
    isBackNavigation?: boolean;
    navigation?: any;
}

const TopPanel: FC<Props> = function ({
    iconName,
    routeName,
    side = "right",
    isBackNavigation,
    navigation,
}) {
    const styles = useStyles();

    const handlePress = () => {
        if (isBackNavigation) {
            navigation?.goBack?.();
        } else {
            // Stack.Navigation can push the route
            navigation?.push?.(routeName);
        }
    };

    return (
        <View
            style={[
                styles.container,
                {
                    justifyContent:
                        side === "left" || isBackNavigation
                            ? "flex-start"
                            : "flex-end",
                },
            ]}
        >
            <TouchableOpacity onPress={handlePress}>
                <Icon
                    name={
                        isBackNavigation
                            ? "arrow-back"
                            : iconName
                            ? iconName
                            : "sync"
                    }
                    type="ionicon"
                    size={22}
                />
            </TouchableOpacity>
        </View>
    );
};

const useStyles = makeStyles(() => ({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 10,
    },
}));

export { TopPanel };
