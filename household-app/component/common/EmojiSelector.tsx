import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    selectedIndex?: number;
    avatarList: string[];
    avatarSelect: (selectedIndex: number) => void;
};

const EmojiSelector: FC<Props> = ({ selectedIndex, avatarList, avatarSelect }: Props): React.ReactElement => {
    return (
        <View>
            <View style={styles.avatars}>
                {avatarList.map(function (name, index) {
                    return (
                        <TouchableOpacity onPress={() => avatarSelect(index)} key={index}>
                            <Text style={styles.avatar}>{Avatars[Number(name)]}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View>
                {selectedIndex && (
                    <Text style={{ marginTop: 40, fontSize: 20 }}>
                        Vald avatar:
                        <Text style={styles.avatar}> {Avatars[Number(avatarList[selectedIndex])]} </Text>
                    </Text>
                )}
            </View>
        </View>
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
