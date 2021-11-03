import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Surface } from "react-native-paper";
import Button from "../../component/common/Button";
import ToggleDarkThemeSwitch from "../../component/common/ToggleDarkThemeSwitch";
import ProfileModule from "../../component/profile/ProfileModule";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.HouseholdProfile>;

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
enum AvatarColors {
    "#FF6848" = 1,
    "#FFA2F2" = 2,
    "#CFF5BF" = 3,
    "#F5E9B3" = 4,
    "#F597C4" = 5,
    "#B7DFFF" = 6,
    "#FF9F26" = 7,
    "#E4E5FE" = 8
}

const HouseholdProfile: FC<Props> = ({ navigation }): React.ReactElement => {
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
    const [avatarColor, setAvatarColor] = useState<number>(-1);

    useEffect(() => {
        const member = currentHousehold?.member.filter((m) => m.userId === user?.id);
        if (member) {
            setAvatar(member[0].emoji);
            setUsername(member[0].name);
            setAvatarColor(member[0].emoji);
        }
        console.log(avatar);
        console.log(username);
    }, [avatar, username, avatarColor]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <ToggleDarkThemeSwitch />,
        });
    }, [navigation]);

    return (
        <>
            <View style={styles.topBar}>
                <View style={{ ...styles.avatarBg, backgroundColor: AvatarColors[avatar] }}>
                    <Text style={styles.avatar}> {Avatars[avatar]} </Text>
                </View>
            </View>
            <Surface style={styles.container}>
                <View style={styles.profileSurface}>
                    <Text style={styles.text}>{username}</Text>
                    <ProfileModule isOpen={isClickedTaskOpen} handleModalClose={handleTaskClose} />
                </View>
                <View style={styles.buttonAlign}>
                    <Button
                        text="Ändra profil"
                        onPress={handleTaskOpen}
                        iconType={{ type: "MaterialIcons", icons: "edit" }}
                        buttonStyle={styles.button}
                    />
                </View>
            </Surface>
        </>
    );
};

const styles = StyleSheet.create({
    profileSurface: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 16,
    },
    avatarBg: {
        width: 200, 
        height: 200, 
        borderRadius: 100,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
    },
    buttonAlign: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
    },
    topBar: {
        alignItems: "center",
        justifyContent: "center",
        margin: 24,
    },
    container: {
        flex: 1,
    },
    text: {
        color: "grey",
        fontSize: 40,
        marginHorizontal: 16,
    },
    avatar: {
        alignItems: "center",
        justifyContent: "center",
        fontSize: 80,
        marginVertical: 45,
        marginHorizontal: 30,
    },
});

export default HouseholdProfile;
