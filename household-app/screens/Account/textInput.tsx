import React from "react";
import { TextInputProps, View, Text, TextInput as NativeTextInput } from "react-native";
import { StyleSheet } from "react-native";

interface Props extends TextInputProps {
    label: string;
    helperText?: string;
}

export default function TextInput({ label, helperText, ...textInputProps }: Props) {
    return (
        <View style={styles.root}>
            <Text style={styles.title}>{label}</Text>
            <NativeTextInput {...textInputProps} style={styles.input} />
            {helperText && <Text style={styles.helperText}>{helperText}</Text>}
        </View>
    );
}

const offset = 16;
const styles = StyleSheet.create({
    root: {
        width: "100%",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: 15,
        fontWeight: "500",
    },
    helperText: {
        color: "red",
    },
    title: {
        marginTop: offset,
        fontSize: offset,
        color: "gray",
    },
    input: {
        width: 300,
        height: 40,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 16,
        margin: 8,
    },
});
