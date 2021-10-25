import React from "react";
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from "react-native";

interface TaskNow {
    id: string;
    name: string;
    householdId?: string;
    description?: string;
    repeated?: number;
    archived?: boolean;
    value?: number;
    emojiList?: number[];
}

interface Props {
    task: TaskNow;
    onPress: () => void;
}

const TaskCard = (props: Props) => {
    console.log("TASK CARD", props.task);
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={Styles.container}>
                <View style={Styles.cardContainer}>
                    <View style={Styles.infoStyle}>
                        <Text style={Styles.titleStyle}>
                            {props.task.name}
                            <Text style={Styles.bodyEmoji}>{props.task.emojiList?.join(" ")}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default TaskCard;
const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 25;
const radius = 20;
const Styles = StyleSheet.create({
    container: {
        width: deviceWidth - 20,
        marginTop: 20,
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
    titleStyle: {
        // color: "#F5EDED",
        // textAlign: "center",
        // flex: 1,
        lineHeight: 11 + 11 + 10,
        fontSize: 20,
        fontWeight: "800",
    },
    bodyTextStyle: {
        fontWeight: "200",
        // color: "#F5EDED",
        textAlign: "center",
    },
    bodyEmoji: {
        fontWeight: "200",
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
