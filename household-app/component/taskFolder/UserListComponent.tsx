import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import ItemSeparator from "../itemSeparator/itemSeparator.component";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../Redux/hooks";

interface fullMemberInfo {
    name: string;
    userId: string;
    emoji: number;
    isPaused: boolean;
    isOwner: boolean;
    AcceptedStatus: "accepted" | "pending" | "rejected";
}

interface Props {
    member: fullMemberInfo;
    onPress: () => void;
}

export default function HouseholdComponent(props: Props) {
    // const user = useAppSelector(selectCurrentLoginUser);
    const user = useAppSelector(selectCurrentLoginUser);

    return (
        <View>
            <Pressable style={styles.title} onPress={props.onPress}>
                {props.member.isOwner && user?.id === props.member.userId && (
                    <Text style={styles.text}>{"Du själv som ägare: " + props.member.name}</Text>
                )}
                {props.member.userId === user?.id && !props.member.isOwner && (
                    <Text style={styles.text}>{"Du själv: " + props.member.name}</Text>
                )}
                {props.member.userId !== user?.id && props.member.isOwner && (
                    <Text style={styles.text}>{"Ägare: " + props.member.name}</Text>
                )}
                {props.member.userId !== user?.id &&
                    !props.member.isOwner &&
                    props.member.AcceptedStatus === "pending" && (
                        <Text style={styles.text}>{"Ansökan: " + props.member.name}</Text>
                    )}
                {props.member.userId !== user?.id &&
                    !props.member.isOwner &&
                    props.member.AcceptedStatus === "accepted" && (
                        <Text style={styles.text}>{"Medlem: " + props.member.name}</Text>
                    )}
            </Pressable>
            <ItemSeparator />
        </View>
    );
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        padding: 12,
    },
    title: {
        backgroundColor: "white",
        flexDirection: "column",
        alignItems: "center",
        padding: 8,
    },
});
