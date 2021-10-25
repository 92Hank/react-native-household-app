/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

interface Props {
    isVisible: boolean;
    message: string;
}

const SnackbarComponent = (props: Props) => {
    const [visible, setVisible] = useState(props.isVisible);

    // const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={styles.container}>
            {/* <Button onPress={onToggleSnackBar}>{visible ? "Hide" : "Show"}</Button> */}
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: "Dismiss",
                    onPress: () => onDismissSnackBar(),
                }}
            >
                {props.message}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
});

export default SnackbarComponent;
