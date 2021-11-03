import React, { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
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
    const [change, setChange] = useState(true);

    const [avatarState, setAvatar] = useState<Avatars>();

    const existingAvatars: number[] = [];
    let avatars = Object.keys(Avatars).filter((key) => !isNaN(Number(key)));

    household.member.forEach((element) => {
        existingAvatars.push(element.emoji);
    });
    avatars = avatars.filter((val) => !existingAvatars.includes(Number(val)));

    if (currentAvatar) {
        avatars = [...avatars, String(currentAvatar)];
    }

    const avatarSelect = (avatar: Avatars) => {
        setAvatar(avatar);
        newSelected(avatar);
        setChange(true);
    };

    const changingAvatar = (
        <View style={styles.rootSelect}>
            <Text>Välj avatar</Text>
            <EmojiSelector selectedAvatars={avatarState} avatarList={avatars} avatarSelect={avatarSelect} />
        </View>
    );

    const notChangingAvatar = (
        <View style={styles.root}>
            <Text>Vald avatar</Text>
            <TouchableOpacity onPress={() => setChange(false)}>
                <Text style={styles.avatar}> {Avatars[avatar]} </Text>
            </TouchableOpacity>
        </View>
    );

    return <View>{!change ? changingAvatar : notChangingAvatar}</View>;
};

export default ProfileEmojiSelector;

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        // flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: 260,
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    rootSelect: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: 260,
        marginVertical: 10,
    },
    avatar: {
        fontSize: 45,
        margin: 10,
        flexWrap: "wrap",
        width: "100%",
    },
});
