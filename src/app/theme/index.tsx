import React, { FC, PropsWithChildren } from "react";
import { Appearance } from "react-native";
import {
    createTheme,
    ThemeProvider as ThemeProviderLocal,
} from "@rneui/themed";

import { ThemeSettings } from "./ThemeSettings";

const theme = createTheme({
    lightColors: {
        primary: "#000000",
        secondary: "#9E9E9E",
        background: "#E1F5FE",
        black: "#01579B",
    },
    darkColors: {
        primary: "#F5F5F5",
        secondary: "#BDBDBD",
        background: "#1A237E",
        black: "#E8EAF6",
    },
    mode: Appearance.getColorScheme() || "light",
});

interface Props extends PropsWithChildren {}

const ThemeProvider: FC<Props> = ({ children }) => {
    return (
        <ThemeProviderLocal theme={theme}>
            <ThemeSettings>{children}</ThemeSettings>
        </ThemeProviderLocal>
    );
};

export { ThemeProvider };
