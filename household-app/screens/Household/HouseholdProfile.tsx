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

    useEffect(() => {
        const member = currentHousehold?.member.filter((m) => m.userId === user?.id);
        if (member) {
            setAvatar(member[0].emoji);
            setUsername(member[0].name);
        }
        console.log(avatar);
        console.log(username);
    }, [avatar, username]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <ToggleDarkThemeSwitch />,
        });
    }, [navigation]);

    return (
        <>
            <View style={styles.topBar}>
                <View style={styles.avatarImage}>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
    },
    avatarImage: {},
    container: {
        flex: 1,
        marginTop: 20,
    },
    text: {
        color: "grey",
        fontSize: 40,
        marginHorizontal: 16,
    },
    avatar: {
        fontSize: 80,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HouseholdProfile;

/*<View style={styles.darkThemeButton}>
    <ToggleDarkThemeSwitch>DarkMode Switch</ToggleDarkThemeSwitch>
</View>*/
