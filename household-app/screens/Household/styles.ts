import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Math.round(Dimensions.get("window").height);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    listContainer: {
        maxHeight: deviceHeight - 241,
    },
});

export default styles;
