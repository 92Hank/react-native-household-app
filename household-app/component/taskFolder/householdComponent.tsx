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
                                <Text style={styles.bodyEmoji}>{avatar}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>{props.member.name}</Text>
                            </View>
                            <View style={styles.role}>
                                <Text style={styles.roleText}>{"Du själv som ägare"}</Text>
                            </View>
                        </View>
                    )}
                    {props.member.userId === user?.id && !props.member.isOwner && (
                        <View style={styles.smallContainer}>
                            <Text style={styles.bodyEmoji}>{avatar}</Text>
                            <View>
                                <Text style={styles.title}>{props.member.name}</Text>
                            </View>
                            <View style={styles.role}>
                                <Text style={styles.roleText}>{"Du själv"}</Text>
                            </View>
                        </View>
                    )}
                    {props.member.userId !== user?.id && props.member.isOwner && (
                        <View style={styles.smallContainer}>
                            <Text style={styles.bodyEmoji}>{avatar}</Text>
                            <View>
                                <Text style={styles.title}>{props.member.name}</Text>
                            </View>
                            <View style={styles.role}>
                                <Text style={styles.roleText}>{"Ägare"}</Text>
                            </View>
                        </View>
                    )}
                    {props.member.userId !== user?.id &&
                        !props.member.isOwner &&
                        props.member.AcceptedStatus === "pending" && (
                            <View style={styles.smallContainer}>
                                <Text style={styles.bodyEmoji}>{avatar}</Text>
                                <View>
                                    <Text style={styles.title}>{"Ansökan: " + props.member.name}</Text>
                                </View>
                            </View>
                        )}
                    {props.member.userId !== user?.id &&
                        !props.member.isOwner &&
                        props.member.AcceptedStatus === "accepted" &&
                        !props.member.isPaused && (
                            <View style={styles.smallContainer}>
                                <Text style={styles.bodyEmoji}>{avatar}</Text>
                                <View>
                                    <Text style={styles.title}>{props.member.name}</Text>
                                </View>
                                <View style={styles.role}>
                                    <Text style={styles.roleText}>{"Medlem"}</Text>
                                </View>
                            </View>
                        )}
                    {props.member.userId !== user?.id &&
                        !props.member.isOwner &&
                        props.member.AcceptedStatus === "accepted" &&
                        props.member.isPaused && (
                            <View style={styles.smallContainer}>
                                <Text style={styles.bodyEmoji}>{avatar}</Text>
                                <View>
                                    <Text style={styles.title}>{props.member.name}</Text>
                                </View>
                                <View style={styles.role}>
                                    <Text style={{ ...styles.roleText, color: "red" }}>{"Pausad"}</Text>
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
    role: {
        alignSelf: "center",
        flex: 1,
    },
    roleText: {
        alignSelf: "flex-end",
        marginRight: 10,
    },
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
        justifyContent: "flex-start",
        alignSelf: "center",
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 12,
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
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center",
    },
    bodyTextStyle: {
        fontWeight: "200",
        textAlign: "center",
    },
    bodyEmoji: {
        marginRight: 10,
        fontSize: 22,
    },
    infoStyle: {
        marginHorizontal: 10,
        marginVertical: 1,
    },
});
