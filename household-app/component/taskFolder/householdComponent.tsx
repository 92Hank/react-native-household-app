import React, { useEffect, useState } from "react";
import { View, Pressable, StyleSheet, Dimensions } from "react-native";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { Surface, Text } from "react-native-paper";

interface fullMemberInfo {
    name: string;
    userId: string;
    emoji: number;
    isPaused: boolean;
    isOwner: boolean;
    AcceptedStatus: "accepted" | "pending" | "rejected";
}

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

interface Props {
    member: fullMemberInfo;
    onPress: () => void;
}

export default function HouseholdComponent(props: Props) {
    const [avatar, setAvatar] = useState<string>();

    const user = useAppSelector(selectCurrentLoginUser);

    useEffect(() => {
        const memberAvatar = props.member.emoji;
        let avatars = Object.keys(Avatars);
        avatars = avatars.filter((x) => isNaN(Number(x)));
        for (let index = 0; index < avatars.length; index++) {
            if (index === memberAvatar - 1) {
                setAvatar(avatars[index]);
            }
        }
    }, []);

    return (
        <View>
            <Pressable onPress={props.onPress}>
                <Surface style={styles.container}>
                    {props.member.isOwner && user?.id === props.member.userId && (
                        <View style={styles.smallContainer}>
                            <View>
                                <Text style={styles.title}>{"Du själv som ägare: " + props.member.name}</Text>
                            </View>
                            <View>
                                <Text style={styles.bodyEmoji}>{avatar}</Text>
                            </View>
                        </View>
                    )}
                    {props.member.userId === user?.id && !props.member.isOwner && (
                        <View style={styles.smallContainer}>
                            <Text style={styles.title}>{"Du själv: " + props.member.name}</Text>
                            <View>
                                <Text style={styles.bodyEmoji}>{avatar}</Text>
                            </View>
                        </View>
                    )}
                    {props.member.userId !== user?.id && props.member.isOwner && (
                        <View style={styles.smallContainer}>
                            <Text style={styles.title}>{"Ägare: " + props.member.name}</Text>
                            <View>
                                <Text style={styles.bodyEmoji}>{avatar}</Text>
                            </View>
                        </View>
                    )}
                    {props.member.userId !== user?.id &&
                        !props.member.isOwner &&
                        props.member.AcceptedStatus === "pending" && (
                            <View style={styles.smallContainer}>
                                <Text style={styles.title}>{"Ansökan: " + props.member.name}</Text>
                                <View>
                                    <Text style={styles.bodyEmoji}>{avatar}</Text>
                                </View>
                            </View>
                        )}
                    {props.member.userId !== user?.id &&
                        !props.member.isOwner &&
                        props.member.AcceptedStatus === "accepted" &&
                        !props.member.isPaused && (
                            <View style={styles.smallContainer}>
                                <Text style={styles.title}>{"Medlem: " + props.member.name}</Text>
                                <View>
                                    <Text style={styles.bodyEmoji}>{avatar}</Text>
                                </View>
                            </View>
                        )}
                    {props.member.userId !== user?.id &&
                        !props.member.isOwner &&
                        props.member.AcceptedStatus === "accepted" &&
                        props.member.isPaused && (
                            <View style={styles.smallContainer}>
                                <Text style={styles.title}>{"Pausad: " + props.member.name}</Text>
                                <View>
                                    <Text style={styles.bodyEmoji}>{avatar}</Text>
                                </View>
                            </View>
                        )}
                </Surface>
            </Pressable>
        </View>
    );
}
const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 25;
const radius = 20;
const styles = StyleSheet.create({
    lateTask: {
        color: "white",
        fontSize: 18,
        marginHorizontal: 16,
        marginVertical: 15,
        backgroundColor: "#cd5d6f",
    },
    task: {
        color: "black",
        fontSize: 18,
        marginHorizontal: 15,
        marginVertical: 16,
        backgroundColor: "#f2f2f2",
    },
    container: {
        width: deviceWidth - 20,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 6,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    smallContainer: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "flex-end",
        alignSelf: "center",
    },
    cardContainer: {
        margin: 10,
        width: deviceWidth - offset,
        backgroundColor: "yellow",
        height: 70,
        borderRadius: radius,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        // color: "#F5EDED",
        // textAlign: "center",
        // flex: 1,
        fontWeight: "bold",
        // lineHeight: 11 + 11 + 10,
        fontSize: 22,
        marginHorizontal: 15,
        marginVertical: 12,
    },
    bodyTextStyle: {
        fontWeight: "200",
        // color: "#F5EDED",
        textAlign: "center",
    },
    bodyEmoji: {
        // fontWeight: "200",
        fontSize: 22,
        marginHorizontal: 15,
        marginVertical: 12,

        // color: "#F5EDED",
        // lineHeight: 11 + 11 + 10,
        // paddingLeft: 2000,
        // textAlign: "right",
    },
    infoStyle: {
        marginHorizontal: 10,
        marginVertical: 1,
    },
});
