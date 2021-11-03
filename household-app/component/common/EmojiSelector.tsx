import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Surface, Text } from "react-native-paper";

type Props = {
    selectedAvatars?: Avatars;
    avatarList: string[];
    avatarSelect: (Avatars: Avatars) => void;
};

const EmojiSelector: FC<Props> = ({ selectedAvatars, avatarList, avatarSelect }: Props): React.ReactElement => {
    return (
        <Surface>
            <Surface style={styles.avatars}>
                {avatarList.map(function (name, index) {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                avatarSelect(Number(avatarList[index]));
                            }}
                            key={index}
                        >
                            <Text style={styles.avatar}>{Avatars[Number(name)]}</Text>
                        </TouchableOpacity>
                    );
                })}
            </Surface>
            {/* <Surface>
                {selectedAvatars && (
                    <Text style={{ marginTop: 40, fontSize: 16, marginLeft: 10 }}>
                        Vald avatar:
                        <Text style={styles.avatar}> {Avatars[selectedAvatars]} </Text>
                    </Text>
                )}
            </Surface> */}
        </Surface>
    );
};

export default EmojiSelector;

const styles = StyleSheet.create({
    avatar: {
        fontSize: 45,
        margin: 10,
        flexWrap: "wrap",
    },
    avatars: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: 260,
    },
});
export enum Avatars {
    "🦊" = 1,
    "🐷" = 2,
    "🐸" = 3,
    "🐥" = 4,
    "🐙" = 5,
    "🐬" = 6,
    "🦉" = 7,
    "🦄" = 8,
}
