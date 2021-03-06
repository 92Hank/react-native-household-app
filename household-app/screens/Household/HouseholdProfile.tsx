import React, { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Surface } from "react-native-paper";
import Button from "../../component/common/Button";
import ToggleDarkThemeSwitch from "../../component/common/ToggleDarkThemeSwitch";
import ProfileModule from "../../component/profile/ProfileModule";
import SnackbarComponent from "../../component/snackbar/snackbarComponent";
import { snackbarContext } from "../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useLazyGetHouseholdByIdQuery } from "../../Redux/Service/household/householdApi";
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
    "#E4E5FE" = 8,
}

const HouseholdProfile: FC<Props> = ({ navigation }): React.ReactElement => {
    const [isClickedTaskOpen, setIsClickedTaskOpen] = useState(false);
    const { message, isVisible } = useContext(snackbarContext);

    const handleTaskClose = () => {
        setIsClickedTaskOpen(false);
    };
    const handleTaskOpen = () => {
        setIsClickedTaskOpen(true);
    };

    const HouseholdId = useAppSelector(selectSelectedHousehold);
    const user = useAppSelector(selectCurrentLoginUser);

    const [loadHouseholdData, householdResult] = useLazyGetHouseholdByIdQuery();
    const { data: currentHousehold, isLoading } = householdResult;

    const [avatar, setAvatar] = useState<number>(-1);
    const [username, setUsername] = useState<string>("");
    const [avatarColor, setAvatarColor] = useState<number>(-1);

    useEffect(() => {
        if (HouseholdId?.id) {
            loadHouseholdData(HouseholdId.id);
        }
    }, []);

    useEffect(() => {
        const member = currentHousehold?.member.filter((m) => m.userId === user?.id);
        if (member) {
            setAvatar(member[0].emoji);
            setUsername(member[0].name);
            setAvatarColor(member[0].emoji);
        }
    }, [currentHousehold]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <ToggleDarkThemeSwitch />,
        });
    }, [navigation]);

    return (
        <>
            <SnackbarComponent isVisible={isVisible} message={message} />
            <View style={styles.topBar}>
                <Surface style={{ ...styles.avatarBg, backgroundColor: AvatarColors[avatar] }}>
                    <Text style={styles.avatar}> {Avatars[avatar]} </Text>
                </Surface>
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
        justifyContent: "center",
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
        fontSize: 80,
        alignSelf: "center",
    },
});

export default HouseholdProfile;
