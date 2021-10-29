import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Surface } from "react-native-paper";
import { household } from "../../../Common/household";
import { Avatars } from "../common/EmojiSelector";
import MemberEmojiSelector from "./MemberEmojiSelector";

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

    return (
        <Surface>
            {!change && (
                <TouchableOpacity onPress={() => setChange(true)}>
                    <Text style={styles.avatar}> {Avatars[avatar]} </Text>
                </TouchableOpacity>
            )}

            {change && (
                <MemberEmojiSelector
                    household={household}
                    newSelected={(avatar) => {
                        setChange(false);
                        newSelected(avatar);
                    }}
                    currentAvatar={currentAvatar}
                />
            )}
        </Surface>
    );
};

export default ProfileEmojiSelector;

const styles = StyleSheet.create({
    avatar: {
        fontSize: 45,
        margin: 10,
        flexWrap: "wrap",
    },
});
