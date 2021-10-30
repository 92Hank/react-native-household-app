import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Surface } from "react-native-paper";
import { household } from "../../../Common/household";
import EmojiSelector, { Avatars } from "../common/EmojiSelector";

type Props = {
    household: household;
    currentAvatar?: Avatars;
    avatar: Avatars;
    newSelected: (avatar: Avatars) => void;
};

const ProfileEmojiSelector: FC<Props> = ({
    household,
    avatar,
    newSelected,
    currentAvatar,
}: Props): React.ReactElement => {
    const [change, setChange] = useState(false);

    const [avatarState, setAvatar] = useState<Avatars>();

    const existingAvatars: number[] = [];
    let avatars = Object.keys(Avatars).filter((key) => !isNaN(Number(key)));

    household.member.forEach((element) => {
        existingAvatars.push(element.emoji);
    });
    avatars = avatars.filter((val) => !existingAvatars.includes(Number(val)));

    if (currentAvatar) {
        avatars = [...avatars, String(currentAvatar)];
        console.log("avatars", avatars);
    }

    const avatarSelect = (avatar: Avatars) => {
        setAvatar(avatar);
        newSelected(avatar);
    };

    return (
        <Surface>
            {!change && (
                <Surface style={styles.root}>
                    <Text>Vald avatar</Text>
                    <TouchableOpacity onPress={() => setChange(true)}>
                        <Text style={styles.avatar}> {Avatars[avatar]} </Text>
                    </TouchableOpacity>
                </Surface>
            )}

            {change && (
                <Surface style={styles.rootSelect}>
                    <Text>Välj avatar</Text>
                    <EmojiSelector selectedAvatars={avatarState} avatarList={avatars} avatarSelect={avatarSelect} />
                </Surface>
            )}
        </Surface>
    );
};

export default ProfileEmojiSelector;

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        // flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    rootSelect: {
        flexDirection: "column",
        // flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    avatar: {
        fontSize: 45,
        margin: 10,
        flexWrap: "wrap",
    },
});
