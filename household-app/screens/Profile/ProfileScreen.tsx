import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Switch, TouchableRipple } from "react-native-paper";
import { PreferencesContext } from "../../context/PreferencesContext";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const ProfileScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const { theme, toggleTheme } = React.useContext(PreferencesContext);

    const onPressTasks = () => {
        navigation.navigate(MainRoutes.TasksScreen);
    };

    return (
        <View style={styles.container}>
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
            <TouchableOpacity onPress={onPressTasks} style={styles.button}>
                <Text style={styles.buttonText}>Tasks</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Profile</Text>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "grey",
    },
    buttonText: {
        color: "black",
        fontSize: 16,
    },
    button: {
        margin: 15,
        backgroundColor: "#D8D8D8",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 100,
        width: 100,
        alignItems: "center",
    },
    preference: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
