import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import styles from "./styles";

interface Props {
    buttons: number[];
    onPress: (event: any, i: number) => void;
    event: any;
}

const CircleButtonGroup: React.FC<Props> = ({ buttons, onPress, event }) => {
    const [clickedId, setClickedId] = useState(-1);

    // const handleClick = (event: any, id: any) => {
    //   setClickedId(id);
    //   console.log('button: ' + buttons[id])
    //   onPress(event);
    // };

    return (
        <View style={styles.container}>
            {buttons.map((buttonLabel, i) => (
                <TouchableOpacity
                    key={i}
                    onPress={() => onPress(event, i)}
                    event={event}
                    style={styles.circleButton}
                    {...(i === clickedId ? "circleButton active" : "circleButton")}
                >
                    <Text style={styles.circleBtnText}>{buttonLabel}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default CircleButtonGroup;
