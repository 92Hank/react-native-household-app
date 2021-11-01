/* eslint-disable @typescript-eslint/no-namespace */
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native-appearance";
import {
    DarkTheme,
    DarkTheme as PaperDarkTheme,
    DefaultTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
    useTheme,
} from "react-native-paper";
import { PreferencesContext } from "./context/PreferencesContext";
import MainNavigation from "./navigation/MainNavigation";
import { store } from "./Redux/store";
import { Provider as ReduxProvider } from "react-redux";
import SnackbarProvider from "./context/snackBarContext";

declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            contrastColor: string;
            blackWhiteToggle: string;
            whiteBlackToggle: string;
        }
    }
}

// const Stack = createNativeStackNavigator();

const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
    },
};
const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
    },
};

export default function App() {
    const colorScheme = useColorScheme();

    const [theme, setTheme] = React.useState<"light" | "dark">(colorScheme === "dark" ? "dark" : "light");

    function toggleTheme() {
        setTheme((theme) => (theme === "light" ? "dark" : "light"));
    }

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            theme,
        }),
        [theme],
    );

    const headerTheme = useTheme();
    const navigationTheme = headerTheme.dark ? DarkTheme : DefaultTheme;

    return (
        <ReduxProvider store={store}>
            <SnackbarProvider>
                <PreferencesContext.Provider value={preferences}>
                    <PaperProvider
                        theme={
                            theme === "light"
                                ? {
                                      ...CombinedDefaultTheme,
                                      colors: {
                                          ...CombinedDefaultTheme.colors,
                                          primary: "#1ba1f2",
                                          contrastColor: "#f2f2f2",
                                          blackWhiteToggle: "white",
                                          whiteBlackToggle: "black",
                                      },
                                  }
                                : {
                                      ...CombinedDarkTheme,
                                      colors: {
                                          ...DarkTheme.colors,
                                          primary: "#1ba1f2",
                                          contrastColor: "#484848",
                                          blackWhiteToggle: "#373737",
                                          whiteBlackToggle: "white",
                                      },
                                  }
                        }
                    >
                        <StatusBar style="auto" />
                        <MainNavigation />
                    </PaperProvider>
                </PreferencesContext.Provider>
            </SnackbarProvider>
        </ReduxProvider>
    );
}
