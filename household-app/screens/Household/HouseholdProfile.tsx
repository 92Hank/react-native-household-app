import React, { FC, useState } from "react";
import Button from "../../component/common/Button";
import ProfileModule from "../../component/profile/ProfileModule";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Divider, Surface } from "react-native-paper";
import { PreferencesContext } from "../../context/PreferencesContext";
import  ToggleDarkThemeSwitch  from "../../component/common/ToggleDarkThemeSwitch";

import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { number } from "yup/lib/locale";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const HouseholdProfile: FC<Props> = (): React.ReactElement => {
    const [isClickedTaskOpen, setIsClickedTaskOpen] = useState(false);
    const handleTaskClose = () => {
        setIsClickedTaskOpen(false);
    };
    const handleTaskOpen = () => {
        setIsClickedTaskOpen(true);
    };

    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const user = useAppSelector(selectCurrentLoginUser);

    const [avatar, setAvatar] = useState<Number>(-1);
    const [username, setUsername] = useState<String>()

    const member = currentHousehold.member.filter((m) => m.userId === user.id);
        setAvatar(member[0].emoji);
        setUsername(member[0].name);

    return (
        <>
            <View style={styles.topBar}>
                <View style={styles.leftSide}>
                    
                </View>
                <View style={styles.avatarImage}>
                    <Avatar.Image
                        size={120}
                        source={require("../../assets/logotypeBlack/logoBS.png")}
                        style={styles.profileImage}
                    />
                    
                </View>
                <View style={styles.darkThemeButton}>
                    <ToggleDarkThemeSwitch>DarkMode Switch</ToggleDarkThemeSwitch>
                </View>
            </View>
            <Surface style={styles.container}>
                <Text style={styles.labelText}>Member User Name</Text>
                <Text style={styles.text}>{username}</Text>
                <Divider style={styles.divider} />
            </Surface>
            <Surface style={styles.profileSurface}>
                <Button text="Ändra Profil" onPress={handleTaskOpen} 
                iconType={{ type: "MaterialIcons", icons: "open-in-new" }} 
                buttonStyle={styles.button} />
                <ProfileModule isOpen={isClickedTaskOpen} handleModalClose={handleTaskClose} />
            </Surface>
        </>
    );
};

const styles = StyleSheet.create({
    profileSurface: {
        fontSize: 45,
        flexWrap: "wrap",
        flex: 1,
    },
    button: {
        marginVertical: 16, 
        width: "95%",
    },
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
    labelText: {
        color: "grey",
        fontSize: 16,
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

export default HouseholdProfile;
