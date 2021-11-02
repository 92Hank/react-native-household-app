import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider, Surface } from "react-native-paper";
import Button from "../../component/common/Button";
import ToggleDarkThemeSwitch from "../../component/common/ToggleDarkThemeSwitch";
import ProfileModule from "../../component/profile/ProfileModule";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

enum Avatars {
    "🦊" = 1,
    "🐷" = 2,
    "🐸" = 3,
    "🐥" = 4,
    "🐙" = 5,
    "🐬" = 6,
    "🦉" = 7,
    "🦄" = 8,
}

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

    const [avatar, setAvatar] = useState<number>(-1);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const member = currentHousehold?.member.filter((m) => m.userId === user?.id);
        if (member) {
            setAvatar(member[0].emoji);
            setUsername(member[0].name);
        }
        console.log(avatar);
        console.log(username);
    }, [avatar, username]);

    return (
        <>
            <View style={styles.topBar}>
                <View style={styles.leftSide}></View>
                <View style={styles.avatarImage}>
                    <Text style={styles.avatar}> {Avatars[avatar]} </Text>
                    {/* <Avatar.Image
                        size={120}
                        source={require("../../assets/logotypeBlack/logoBS.png")}
                        style={styles.profileImage}
                    /> */}
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
                <Button
                    text="Ändra Profil"
                    onPress={handleTaskOpen}
                    iconType={{ type: "MaterialIcons", icons: "open-in-new" }}
                    buttonStyle={styles.button}
                />
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
    avatar: {
        fontSize: 45,
        margin: 10,
        flexWrap: "wrap",
        width: "100%",
    },
});

export default HouseholdProfile;
