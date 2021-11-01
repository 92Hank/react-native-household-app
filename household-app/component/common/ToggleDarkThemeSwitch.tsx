import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch, TouchableRipple } from "react-native-paper";
import { PreferencesContext } from "../../context/PreferencesContext";

const ToggleDarkThemeSwitch: FC = (): React.ReactElement => {
    const { theme, toggleTheme } = React.useContext(PreferencesContext);
    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <TouchableRipple onPress={toggleTheme}>
                <View style={styles.preference}>
                    <Text style={styles.text}>Dark Theme</Text>
                    <View pointerEvents="none">
                        <Switch
                            ios_backgroundColor="salmon"
                            value={theme === "dark"}
                            trackColor={{ false: "black", true: "turquoise" }}
                        />
                    </View>
                </View>
            </TouchableRipple>
        </>
    );
};

export default ToggleDarkThemeSwitch;

const styles = StyleSheet.create({
    text: {
        color: "grey",
    },
    preference: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
