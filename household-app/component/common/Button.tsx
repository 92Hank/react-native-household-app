import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { PreferencesContext } from "../../context/PreferencesContext";

type iconType =
    | {
          type: "None";
      }
    | {
          type: "MaterialIcons";
          icons: keyof typeof MaterialIcons.glyphMap;
      }
    | {
          type: "MaterialCommunityIcons";
          icons: keyof typeof MaterialCommunityIcons.glyphMap;
      }
    | {
          type: "FontAwesome";
          icons: keyof typeof FontAwesome.glyphMap;
      };

type Props = {
    text: string;
    iconType: iconType;

    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
};
type backgroundColor = {
    backgroundColor: "white" | "dimgrey";
};
type color = {
    color: "white" | "black";
};

const Button: FC<Props> = ({ text, iconType, onPress, buttonStyle, textStyle }: Props): React.ReactElement => {
    const { theme } = React.useContext(PreferencesContext);

    const textColor: color = { color: theme === "light" ? "black" : "white" };
    const buttonColor: backgroundColor = { backgroundColor: theme === "light" ? "white" : "dimgrey" };

    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.ButtonStyle, ...buttonColor, ...buttonStyle }}>
            {switchType(iconType, textColor.color)}
            <Text style={{ ...styles.TextStyle, ...textColor, ...textStyle }}>{text}</Text>
        </TouchableOpacity>
    );
};
export default Button;

function switchType(iconType: iconType, color: string) {
    switch (iconType.type) {
        case "MaterialIcons":
            return <MaterialIcons name={iconType.icons} size={30} color={color} />;

        case "MaterialCommunityIcons":
            return <MaterialCommunityIcons name={iconType.icons} size={30} color={color} />;

        case "FontAwesome":
            return <FontAwesome name={iconType.icons} size={30} color={color} />;

        case "None":
            return <></>;

        default:
            never(iconType);
            return <></>;
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function never(params: never): void {}

const styles = StyleSheet.create({
    ButtonStyle: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: "45%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        elevation: 6,
        borderRadius: 20,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        height: 55,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    TextStyle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
});
