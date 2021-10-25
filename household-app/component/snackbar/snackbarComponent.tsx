/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import SnackBar from "react-native-snackbar-component";

interface Props {
    isVisible: boolean;
    message: string;
}

const SnackbarComponent = (props: Props) => {
    return <SnackBar visible={props.isVisible} position={"top"} textMessage={props.message} />;
};

export default SnackbarComponent;
