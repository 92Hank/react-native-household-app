import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Surface } from "react-native-paper";
import { fullMemberInfo } from "../../../Common/household";
import Button from "../../component/common/Button";
import { Avatars } from "../../component/common/EmojiSelector";
import ToggleDarkThemeSwitch from "../../component/common/ToggleDarkThemeSwitch";
import ProfileEmojiSelector from "../../component/profile/ProfileEmojiSelector";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import {
    useChangeEmojiMutation,
    useChangeNameMutation,
    useLazyGetHouseholdByIdQuery,
} from "../../Redux/Service/household/householdApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const HouseholdProfile: FC<Props> = (): React.ReactElement => {
    const [isSaving, setisSaving] = useState(false);
    const [originalMember, setOriginalMember] = useState<fullMemberInfo>();
    const [editMember, setEditMember] = useState<fullMemberInfo>();
    const user = useAppSelector(selectCurrentLoginUser);
    const household = useAppSelector(selectSelectedHousehold);

    const [getDbHousehold, dbHousehold] = useLazyGetHouseholdByIdQuery();
    const [updateEmoji, { isLoading: isUpdatingEmoji }] = useChangeEmojiMutation();
    const [updateName, { isLoading: isUpdatingName }] = useChangeNameMutation();

    if (!household || !user) return <></>;

    getDbHousehold(household.id);

    useEffect(() => {
        if (!dbHousehold.data) return;

        const member = dbHousehold.data.member.find((m) => m.userId === user.id);
        if (member) {
            setOriginalMember(member);
            setEditMember(member);
        }
    }, [dbHousehold.data]);

    const save = () => {
        if (!editMember || !originalMember || !dbHousehold.data || !user.id) return;

        if (originalMember.emoji !== editMember.emoji) {
            updateEmoji({ emoji: editMember.emoji, houseHoldId: dbHousehold.data.id, userId: user.id });
        }
    };

    return (
        <Surface style={styles.container}>
            <Text style={styles.text}>hushåll</Text>
            {editMember && (
                <Surface>
                    <ProfileEmojiSelector
                        household={household}
                        avatar={editMember.emoji}
                        newSelected={(avatar: Avatars) => {
                            setEditMember({ ...editMember, emoji: avatar });
                            console.log(avatar);
                        }}
                        currentAvatar={originalMember?.emoji}
                    />
                    <Button iconType={{ type: "None" }} onPress={save} text="Save" />
                </Surface>
            )}
            {!editMember && (
                <Surface>
                    <Text>Loading...</Text>
                </Surface>
            )}
            <Text style={styles.text}>Global</Text>
            <ToggleDarkThemeSwitch />
        </Surface>
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
