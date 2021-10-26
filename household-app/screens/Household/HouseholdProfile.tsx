import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Switch, TouchableRipple } from "react-native-paper";
import { PreferencesContext } from "../../context/PreferencesContext";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const HouseholdProfile: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const { theme, toggleTheme } = React.useContext(PreferencesContext);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profil för hushåll</Text>
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
        </View>
    );
};

export default HouseholdProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "grey",
    },
    card: {
        flexDirection: "row",
        shadowOffset: { width: 5, height: 5 },
        width: "90%",
        borderRadius: 12,
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    householdButton: {
        margin: 15,
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 100,
        width: 140,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    householdButtonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
    buttonsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10,
    },
    preference: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
