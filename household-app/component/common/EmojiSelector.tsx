import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatars, household } from "../../../Common/household";

type Props = {
    Household: household;
    selected: number;
    avatarSelect: (selected: number) => void;
};

const EmojiSelector: FC<Props> = ({ Household, selected, avatarSelect }: Props): React.ReactElement => {
    const existingAvatars: number[] = [];
    let avatars = Object.keys(Avatars).filter((key) => !isNaN(Number(key)));
    Household.member.forEach((element) => {
        existingAvatars.push(element.emoji);
    });
    avatars = avatars.filter((val) => !existingAvatars.includes(Number(val)));

    return (
        <View style={styles.avatars}>
            {avatars.map(function (name, index) {
                return (
                    <TouchableOpacity
                        onPress={() => avatarSelect(Avatars[name as keyof typeof Avatars])}
                        key={Avatars[name as keyof typeof Avatars]}
                    >
                        <Text style={styles.avatar}>{name}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
        // <View>
        //     {selected && (
        //         <Text style={{ marginTop: 40, fontSize: 20 }}>
        //             Vald avatar:
        //             <Text style={styles.avatar}> {avatars[Number(selected) - 1]} </Text>
        //         </Text>
        //     )}
        // </View>
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
