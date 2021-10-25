import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
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
            <PreferencesContext.Provider value={preferences}>
                <PaperProvider
                    theme={
                        theme === "light"
                            ? {
                                  ...CombinedDefaultTheme,
                                  colors: { ...CombinedDefaultTheme.colors, primary: "#1ba1f2" },
                              }
                            : {
                                  ...CombinedDarkTheme,
                                  colors: { ...DarkTheme.colors, primary: "#1ba1f2" },
                              }
                    }
                >
                    <StatusBar style="auto" />
                    <MainNavigation />
                </PaperProvider>
            </PreferencesContext.Provider>
        </ReduxProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
