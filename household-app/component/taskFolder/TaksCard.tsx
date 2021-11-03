import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

interface TaskNow {
    id?: string;
    householdId?: string;
    description?: string;
    repeated?: number;
    archived?: boolean;
    value?: number;
    emojiList?: string[];
}

interface Props {
    task: TaskNow;
    onPress: () => void;
}

const TaskCard = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={Styles.container}>
                <View style={Styles.cardContainer}>
                    <View style={Styles.infoStyle}>
                        <Text style={Styles.titleStyle}>
                            {props.task.description}
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
        lineHeight: 11 + 11 + 10,
        fontSize: 20,
        fontWeight: "800",
    },
    bodyTextStyle: {
        fontWeight: "200",
        textAlign: "center",
    },
    bodyEmoji: {
        fontWeight: "200",
    },
    infoStyle: {
        marginHorizontal: 10,
        marginVertical: 1,
    },
});
