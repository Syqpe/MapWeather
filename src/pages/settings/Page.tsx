import React, { useState, useCallback, FC } from "react";
import { View } from "react-native";
import { useTheme, makeStyles } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Input, Text, Icon } from "@components/index";
import { SettingsSection } from "./ui";
import { ThemeSelect } from "./ui/ThemeSelect";
import { TopPanel } from "@widgets/top-panel/index";
import { Routes } from "@pages/index";

interface Props {
    navigation: any;
}

const Settings: FC<Props> = function ({ navigation }) {
    const styles = useStyles();
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

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
            <TopPanel
                isBackNavigation
                navigation={navigation}
                routeName={Routes.Settings}
            />

            <Text h3 bold>
                Settings
            </Text>

            <View style={styles.search}>
                <Input
                    placeholder="Search"
                    placeholderTextColor={
                        theme.colors.secondary
                    }
                    style={{
                        color: theme.colors.primary,
                    }}
                    leftIcon={
                        <Icon
                            type="ionicon"
                            name="search"
                            size={22}
                            color={theme.colors.secondary}
                        />
                    }
                    onChangeText={handleChangeText}
                    value={searchText}
                />
            </View>

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
                                navigation.navigate(
                                    "Notifications",
                                );
                            },
                        },
                        {
                            title: "Sounds",
                            iconName:
                                "musical-notes-outline",
                            onPress: () => {
                                navigation.navigate(
                                    "Sounds",
                                );
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
    search: {
        backgroundColor: theme.colors.background,
        borderRadius: 12,
        height: 40,
        marginVertical: 10,
    },
}));

export { Settings };
