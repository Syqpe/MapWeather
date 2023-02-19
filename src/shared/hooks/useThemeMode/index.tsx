import {
    ThemeMode,
    useThemeMode as useThemeModeLocal,
} from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MODE_KEY } from "@utils/index";

interface Return {
    mode: ThemeMode;
    setMode: (colorMode: ThemeMode) => Promise<void>;
    getModeFromStorage: () => Promise<void>;
}

const useThemeMode = (): Return => {
    const { mode, setMode: setModeLocal } =
        useThemeModeLocal();

    const setMode = async (colorMode: ThemeMode) => {
        await AsyncStorage.setItem(
            MODE_KEY,
            String(colorMode),
        );

        setModeLocal(colorMode);
    };

    const getModeFromStorage = async () => {
        const modeFromStorage = await AsyncStorage.getItem(
            MODE_KEY,
        );

        if (modeFromStorage) {
            setMode(modeFromStorage as ThemeMode);
        } else {
            console.error("App could not get theme.");
        }
    };

    return { mode, setMode, getModeFromStorage };
};

export { useThemeMode };
