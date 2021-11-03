import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    buttonsCircleButton: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        backgroundColor: "#f2f2f2",
        margin: 4,
    },
    buttonsCircleBtnText: {
        // color: "black",
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
    },
    buttonsCircleContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    repeatedCircleButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 100,
    },
    repeatedCircleBtnText: {
        // color: "black",
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
    },
    centeredView: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22,
    },
    centeredViewBlurred: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    scrollableView: {
        // padding: 35,
        // marginLeft: 20,
        // marginRight: 20,
        // marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        // height: "100%",
        marginTop: 10,
    },
    modalView: {
        // marginLeft: 20,
        // marginRight: 20,
        // marginBottom: 20,
        // backgroundColor: "#f2f2f2",
        height: "90%",
        width: "95%",
        borderRadius: 20,
        // padding: 35,
        // alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    modalTextView: {
        // flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        // paddingLeft: 20,
        // position: "absolute",
        // top: 0,
        // left: 0,
        // right: 0,
        // minWidth: "100%",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // backgroundColor: "white",
    },
    modalText: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    buttonsContainer: {
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "flex-end",
        // flex: 1,
        // marginTop: 20,
        // position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    closeButton: {
        // backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "50%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        borderBottomRightRadius: 20,
        borderStartWidth: 1,
        borderStartColor: "gainsboro",
    },
    saveButton: {
        // backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "50%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        borderBottomLeftRadius: 20,
    },
    taskButtonText: {
        // color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
    inputsCard: {
        // flex: 1,
        // backgroundColor: "white",
        width: windowWidth - 50,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 3,
    },
    inputsCard2: {
        // flex: 1,
        // backgroundColor: "white",
        width: windowWidth - 50,
        marginTop: 15,
        marginBottom: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 3,
    },
    input: {
        // backgroundColor: "#ffff",
        width: windowWidth - 50,
        // marginTop: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 3,
    },
    input2: {
        // backgroundColor: "#ffff",
        width: windowWidth - 50,
        height: windowHeight / 7.2,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 10,
    },
    clickedDay: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    clickedDayReturn: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginRight: 10,
    },
    clickedDayTitle: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        // paddingTop: 25,
        // paddingBottom: 27,
        padding: 15,
    },
    clickedDayTitleSub: {
        color: "gray",
        fontSize: 14,
        justifyContent: "center",
        textAlign: "center",
    },
    buttonText: {
        // color: "black",
        fontSize: 18,
        fontWeight: "bold",
    },
    circleButton: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        backgroundColor: "#CD5C5C",
        margin: 2,
    },
    circleButtonValue: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        // backgroundColor: "#f2f2f2",
        margin: 2,
        marginRight: 10,
    },
    circleBtnText: {
        color: "white",
        fontSize: 14,
        justifyContent: "center",
        textAlign: "center",
    },
    circleBtnTextValue: {
        // color: "black",
        fontSize: 14,
        justifyContent: "center",
        textAlign: "center",
    },
});

export default styles;
