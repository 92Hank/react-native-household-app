import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

type iconType =
    | {
          type: "MaterialIcons";
          icons: keyof typeof MaterialIcons.glyphMap;
      }
    | {
          type: "MaterialCommunityIcons";
          icons: keyof typeof MaterialCommunityIcons.glyphMap;
      }
    | {
          type: "FontAwesome5";
          icons: keyof typeof FontAwesome5.glyphMap;
      };

type Props = {
    text: string;
    iconType: iconType;

    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
};

const Button: FC<Props> = ({ text, iconType, onPress, buttonStyle, textStyle }: Props): React.ReactElement => {
    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.ButtonStyle, ...buttonStyle }}>
            {switchType(iconType)}
            <Text style={{ ...styles.TextStyle, ...textStyle }}>{text}</Text>
        </TouchableOpacity>
    );
};
export default Button;

function switchType(iconType: iconType) {
    switch (iconType.type) {
        case "MaterialIcons":
            return <MaterialIcons name={iconType.icons} size={30} color="black" />;

        case "MaterialCommunityIcons":
            return <MaterialCommunityIcons name={iconType.icons} size={30} color="black" />;

        case "FontAwesome5":
            return <FontAwesome5 name={iconType.icons} size={30} color="black" />;

        default:
            never(iconType);
            return <view />;
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function never(params: never): void {}

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
