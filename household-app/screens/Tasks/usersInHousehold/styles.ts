import { StyleSheet, Dimensions } from "react-native";

const deviceHeight = Math.round(Dimensions.get("window").height);
const deviceWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
    listContainer: {
        maxHeight: deviceHeight - 241,
    },
    container: {
        flex: 1,
    },
    inviteCode: {
        textAlign: "center",
        alignSelf: "center",
        width: "100%",
        height: 30,
        // color: "red",
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
    buttonsContainerUser: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default styles;
