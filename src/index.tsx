import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Navigation } from "./pages";
import { ThemeProvider } from "./app/theme";

const App = () => (
    <SafeAreaProvider>
        <ThemeProvider>
            <Navigation />
        </ThemeProvider>
    </SafeAreaProvider>
);

export default App;
