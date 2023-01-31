import { FC } from "react";
import { View } from "react-native";
import { Text, Button, useTheme } from "@rneui/themed";
import { useThemeMode } from "../../shared/hooks";

const Home: FC<{
    navigation: any;
}> = function ({ navigation }) {
    const { theme } = useTheme();
    const { mode, setMode } = useThemeMode();

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ color: theme.colors.primary }}>
                Home Screen
            </Text>
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
            <Button
                title="Go to Details"
                onPress={() =>
                    navigation.navigate("Details")
                }
            />
            <Button
                title="Change"
                onPress={() => {
                    if (mode === "light") {
                        setMode("dark").catch(err => {
                            console.error(err);
                        });
                    } else {
                        setMode("light").catch(err => {
                            console.error(err);
                        });
                    }
                }}
            />
        </View>
    );
};

export { Home };
