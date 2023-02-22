import React, { lazy } from "react";
import { useTheme } from "@rneui/themed";
import {
    NavigationContainer,
    DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./home";
import Weather from "./weather";
const SettingsNavigation = lazy(() => import("./settings"));

const Stack = createNativeStackNavigator();

interface IRoutes {
    Home: string;
    Weather: string;
    Settings: string;
}

const Routes: IRoutes = {
    Home: "Home",
    Weather: "Weather",
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
            <Stack.Navigator initialRouteName={Routes.Home}>
                <Stack.Screen
                    name={Routes.Home}
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={Routes.Weather}
                    component={Weather}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={Routes.Settings}
                    component={SettingsNavigation}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export { Navigation, Routes };
