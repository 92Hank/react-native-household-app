import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Card, Divider, Surface, Switch, TouchableRipple } from "react-native-paper";
import { PreferencesContext } from "../../context/PreferencesContext";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const ProfileScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const { theme, toggleTheme } = React.useContext(PreferencesContext);

    const [isEnabled, setIsEnabled] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);

    const toggleSwitch = () => {
        //To handle switch toggle
        setSwitchValue(true);
    };

    /*const onPressTasks = () => {
      navigation.navigate(MainRoutes.TasksScreen);
    };*/

    return (
        <>
            <View style={styles.topBar}>
                <View style={styles.leftSide}>
                    <Text style={styles.themeText}>Test</Text>
                </View>
                <View style={styles.avatarImage}>
                    <Avatar.Image
                        size={120}
                        source={require("../../assets/logotypeBlack/logoBS.png")}
                        style={styles.profileImage}
                    />
                </View>
                <View style={styles.darkThemeButton}>
                    <TouchableRipple onPress={toggleTheme} hasTVPreferredFocus={false} tvParallaxProperties={{}}>
                        <View style={styles.preference}>
                            <Text style={styles.themeText}>{switchValue ? "☀️" : "🌙"}</Text>
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
                </View>
            </View>
            <Surface style={styles.container}>
            <Text style={styles.labelText}>User Name</Text>
          <Text style={styles.text}>Lilo24</Text>
          <Divider style={styles.divider} />
          
          <Text style={styles.labelText}>Nick Name</Text>
          <Text style={styles.text}>StitchGoesCrazy</Text>
          <Divider style={styles.divider} />
          
          <Text style={styles.labelText}>Password</Text>
          <Text style={styles.text}>***********</Text>
          <Divider style={styles.divider} />
            </Surface>
        </>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
    },
    leftSide: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginLeft: 16,
    },
    avatarImage: {
        justifyContent: "center",
        alignItems: "center",
        flex: 3,
    },
    profileImage: {
        backgroundColor: "white",
        resizeMode: "contain",
    },
    darkThemeButton: {
        paddingRight: 24,
        justifyContent: "flex-end",
    },
    preference: {
        alignItems: "flex-end",
        flexDirection: "row",
    },
    themeText: {
        color: "grey",
        lineHeight: 50,
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    content: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginHorizontal: 16,
    },
    text: {
        color: "grey",
        fontSize: 24,
        marginBottom: 16,
    },
    divider: {
        color: "grey",
        maxWidth: "100%",
    },
});
