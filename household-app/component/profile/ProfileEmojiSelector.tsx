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
                    <MemberEmojiSelector
                        household={household}
                        newSelected={(avatar) => {
                            setChange(false);
                            newSelected(avatar);
                        }}
                        currentAvatar={currentAvatar}
                    />
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
