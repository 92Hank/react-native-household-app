import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { household } from "../../../../Common/household";

interface Props {
    household: household;
    onPress: () => void;
}

export default function HouseholdComponent(props: Props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Surface style={styles.container}>
                <View>
                    <Text style={styles.title}>{props.household.name}</Text>
                </View>
            </Surface>
        </TouchableOpacity>
    );
}
const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
    container: {
        width: deviceWidth - 20,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
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
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginHorizontal: 15,
        marginVertical: 12,
    },
});
