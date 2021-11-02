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
            headerRight: () => (
                <ToggleDarkThemeSwitch />
            ),
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
                <Text style={styles.labelText}>Member User Name</Text>
                <Surface style={styles.profileSurface}>
                    <Text style={styles.text}>{username}</Text>
                    <View style={styles.buttonAlign}>
                        <Button
                            text=""
                            onPress={handleTaskOpen}
                            iconType={{ type: "MaterialIcons", icons: "edit" }}
                            buttonStyle={styles.button}
                        />
                    </View>
                    <ProfileModule isOpen={isClickedTaskOpen} handleModalClose={handleTaskClose} />
                </Surface>
            </Surface>

        </>
    );
};

const styles = StyleSheet.create({
    profileSurface: {
        fontSize: 45,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        marginHorizontal: 16,
    },
    button: {
        width: 60,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
    },
    buttonAlign: {
        alignItems: "flex-end",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        marginVertical: 16,
        marginLeft: 200,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
    },
    avatarImage: {
        
    },
    darkThemeButton: {
        paddingRight: 24,
        justifyContent: "flex-end",
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    labelText: {
        color: "grey",
        fontSize: 16,
        marginHorizontal: 16,
    },
    text: {
        color: "grey",
        fontSize: 24,
        marginHorizontal: 16,
        lineHeight: 50,
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
