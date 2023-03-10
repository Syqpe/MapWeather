import React, { useEffect, FC } from "react";
import { useTheme } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Settings } from "./Page";
import Notifacations from "./pages/Notifacations";
import Sounds from "./pages/Sounds";

const Stack = createNativeStackNavigator();

interface IRoutes {
    Parent: string;
    Notifications: string;
    Sounds: string;
}

const Routes: IRoutes = {
    Parent: "Parent",
    Notifications: "Notifications",
    Sounds: "Sounds",
};

interface Props {
    navigation: any;
    route: any;
}

const SettingsNavigation: FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();

    const navigationState = navigation.getState();

    useEffect(() => {
        if (navigationState.state?.index > 0) {
            navigation.setOptions({
                tabBarVisible: false,
            });
        } else {
            navigation.setOptions({
                tabBarVisible: true,
            });
        }
    }, [navigation, navigationState.state?.index]);

    return (
        <Stack.Navigator
            initialRouteName={Routes.Parent}
            screenOptions={{
                headerStyle: {
                    backgroundColor:
                        theme.colors.background,
                },
            }}
        >
            <Stack.Screen
                name={Routes.Parent}
                component={Settings}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Routes.Notifications}
                component={Notifacations}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Routes.Sounds}
                component={Sounds}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export { SettingsNavigation };
