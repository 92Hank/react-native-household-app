import { Feather } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { iconName } from "../../../Common/iconName";

type Props = {
    text: string;
    featherName: iconName;

    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
};

const Button: FC<Props> = ({ text, featherName, onPress, buttonStyle, textStyle }: Props): React.ReactElement => {
    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.ButtonStyle, ...buttonStyle }}>
            <Feather name={featherName} size={30} color="black" />
            <Text style={{ ...styles.TextStyle, ...textStyle }}>{text}</Text>
        </TouchableOpacity>
    );
};
export default Button;

const styles = StyleSheet.create({
    ButtonStyle: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: "45%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        borderRadius: 20,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        height: 55,
    },
    TextStyle: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
});
