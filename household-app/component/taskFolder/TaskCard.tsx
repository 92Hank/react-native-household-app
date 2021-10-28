/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Badge, Surface } from "react-native-paper";

interface TaskNow {
    id: string;
    name: string;
    householdId?: string;
    description?: string;
    repeated?: number;
    archived?: boolean;
    value?: number;
    emojiList: number[];
    dateDone?: Date;
    createdAt?: Date;
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
    task: TaskNow;
    onPress: () => void;
}

const TaskCard = (props: Props) => {
    const avatarsList = props.task.emojiList;
    const actualAvatars: string[] = [];
    let avatars = Object.keys(Avatars);
    avatars = avatars.filter((x) => isNaN(Number(x)));
    // avatars = avatars.
    console.log(avatars);

    avatarsList?.forEach((x) => {
        actualAvatars.push(avatars[x - 1]);
    });
    // console.log("TASK CARD", props.task);

    let difference = 0;
    const today = new Date();
    let date = new Date();
    if (props.task.dateDone) {
        date = props.task.dateDone;
    } else if (props.task.createdAt) {
        date = props.task.createdAt;
    }

    console.log("HEJ", props.task.dateDone);
    console.log("HEJ2", props.task.createdAt);
    if (today && date) {
        const diff = Math.abs(today.getTime() - date.getTime());
        // eslint-disable-next-line prettier/prettier
        difference = Math.ceil(diff / (1000 * 3600 * 24) - 1);
        console.log("SKILLNADEN", difference);
    }

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Surface style={styles.container}>
                <View>
                    <Text style={styles.title}>{props.task.name}</Text>
                </View>
                {actualAvatars.length > 0 ? (
                    <View>
                        <Text style={styles.bodyEmoji}>{actualAvatars}</Text>
                    </View>
                ) : (
                    <View>
                        <Badge size={25} style={difference < props.task.repeated! ? styles.task : styles.lateTask}>
                            {difference}
                        </Badge>
                    </View>
                )}
            </Surface>
        </TouchableOpacity>
    );
};

export default TaskCard;
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
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
    },

    secondContainer: {
        // marginTop: 20,
        // alignContent: "center",
        // // justifyContent: "center",
        // flexDirection: "row",
        // justifyContent: "space-between",
        // marginVertical: 10,
        // borderRadius: radius,
        // width: "100%",
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
