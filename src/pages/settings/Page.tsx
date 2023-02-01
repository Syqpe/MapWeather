import React, { useState, FC } from "react";
import { View } from "react-native";
import {
    Text,
    Input,
    useTheme,
    Icon,
    makeStyles,
} from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback } from "react";

import { SettingsSection } from "./ui";
import { ThemeSelect } from "./ui/ThemeSelect";

const Settings: FC = function (props) {
    const styles = useStyles(props);
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

    const [searchText, setSearchText] = useState("");

    const handleChangeText = useCallback((text: string) => {
        setSearchText(text);
    }, []);

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
                Settings
            </Text>
            <Input
                placeholder="Search"
                placeholderTextColor={
                    theme.colors.secondary
                }
                style={{ color: theme.colors.primary }}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="search"
                        size={18}
                        color={theme.colors.secondary}
                    />
                }
                onChangeText={handleChangeText}
                value={searchText}
            />
            <View>
                <SettingsSection
                    searchText={searchText}
                    items={[
                        {
                            title: "Theme",
                            render: <ThemeSelect />,
                        },
                        {
                            title: "Notifications",
                            iconName:
                                "notifications-outline",
                            onPress: () => {
                                console.log("1");
                            },
                        },
                        {
                            title: "Sounds",
                            iconName:
                                "musical-notes-outline",
                            onPress: () => {
                                console.log("2");
                            },
                        },
                    ]}
                />
            </View>
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

export { Settings };
