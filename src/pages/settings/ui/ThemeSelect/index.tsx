import React, { useState, FC } from "react";
import {
    ButtonGroup,
    ThemeMode,
    useTheme,
} from "@rneui/themed";

import { useThemeMode } from "@hooks/index";
import { Appearance } from "react-native";

const getThemeIndex = (mode: ThemeMode) => {
    switch (mode) {
        case "dark":
            return 1;
        case "light":
            return 2;
        default:
            return 0;
    }
};

const themeArr = ["default", "dark", "light"];

const ThemeSelect: FC = function ({}) {
    const { theme } = useTheme();
    const { mode, setMode } = useThemeMode();

    const [selectedIndex, setSelectedIndex] = useState(
        getThemeIndex(mode),
    );

    return (
        <ButtonGroup
            selectedButtonStyle={{
                backgroundColor: theme.colors.highlight,
            }}
            containerStyle={{
                marginVertical: 14,
                borderRadius: 8,
            }}
            buttons={themeArr}
            selectedIndex={selectedIndex}
            onPress={(i: number) => {
                setMode(
                    i
                        ? (themeArr[i] as ThemeMode)
                        : (Appearance.getColorScheme() as ThemeMode),
                );
                setSelectedIndex(i);
            }}
        />
    );
};

export { ThemeSelect };
