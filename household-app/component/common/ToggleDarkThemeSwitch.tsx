import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch, TouchableRipple } from "react-native-paper";
import { PreferencesContext } from "../../context/PreferencesContext";

const ToggleDarkThemeSwitch: FC = (): React.ReactElement => {
    const { theme, toggleTheme } = React.useContext(PreferencesContext);
    const [switchValue, setSwitchValue] = useState(false);

    const toggleSwitch = () => {
        setSwitchValue(true);
    };

    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <TouchableRipple onPress={toggleTheme}>
                <View style={styles.preference}>
                    <Text style={styles.text}>{theme === "dark" ? "☀️" : "🌙"}</Text>
                    <View pointerEvents="none">
                        <Switch
                            ios_backgroundColor="salmon"
                            value={theme === "dark"}
                            trackColor={{ false: "grey", true: "white" }}
                            thumbColor={theme === "dark" ? "grey" : "white"}
                            onValueChange={toggleSwitch}
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
