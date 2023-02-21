import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppStateStatus, Platform } from "react-native";
import { focusManager } from "react-query";
import { Provider } from "react-redux";

import { Navigation } from "@pages/index";
import { ThemeProvider } from "@app/theme";
import { QueryClientProvider } from "@API";
import {
    useAppState,
    useOnlineManager,
} from "@hooks/index";
import { store } from "@app/store";

function onAppStateChange(status: AppStateStatus) {
    // React Query already supports in web browser refetch on window focus by default
    if (Platform.OS !== "web") {
        focusManager.setFocused(status === "active");
    }
}

const App = () => {
    useOnlineManager();

    useAppState(onAppStateChange);

    return (
        <Provider store={store}>
            <QueryClientProvider>
                <SafeAreaProvider>
                    <ThemeProvider>
                        <Navigation />
                    </ThemeProvider>
                </SafeAreaProvider>
            </QueryClientProvider>
        </Provider>
    );
};

export default App;
