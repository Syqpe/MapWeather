import React from "react";
import { Icon, useTheme } from "@rneui/themed";
import {
    NavigationContainer,
    DefaultTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./home";
import Settings from "./settings";

const Tab = createBottomTabNavigator();

const NavigationPage = {
    Home: "Home",
    Settings: "Settings",
};

const Navigation = () => {
    const { theme } = useTheme();

    return (
        <NavigationContainer
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: theme.colors.background,
                },
            }}
        >
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({
                        focused,
                        color,
                        size,
                    }) => {
                        let iconName: string = "";

                        if (
                            route.name ===
                            NavigationPage.Home
                        ) {
                            iconName = focused
                                ? "home"
                                : "home-outline";
                        } else if (
                            route.name ===
                            NavigationPage.Settings
                        ) {
                            iconName = focused
                                ? "settings"
                                : "settings-outline";
                        }

                        return (
                            <Icon
                                name={iconName}
                                type="ionicon"
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor:
                        theme.colors.primary,
                    tabBarInactiveTintColor:
                        theme.colors.secondary,
                    tabBarStyle: {
                        backgroundColor:
                            theme.colors.background,
                    },
                    headerStyle: {
                        backgroundColor:
                            theme.colors.background,
                    },
                })}
            >
                <Tab.Screen
                    name={NavigationPage.Home}
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={NavigationPage.Settings}
                    component={Settings}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export { Navigation };
