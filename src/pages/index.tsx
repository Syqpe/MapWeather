import React, { lazy } from "react";
import { Icon, useTheme } from "@rneui/themed";
import {
    NavigationContainer,
    DefaultTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Home = lazy(() => import("./home"));
const Settings = lazy(() => import("./settings"));

const Tab = createBottomTabNavigator();

interface IRoutes {
    Home: string;
    Settings: string;
}

const Routes: IRoutes = {
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

                        if (route.name === Routes.Home) {
                            iconName = focused
                                ? "home"
                                : "home-outline";
                        } else if (
                            route.name === Routes.Settings
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
                    name={Routes.Home}
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={Routes.Settings}
                    component={Settings}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export { Navigation };
