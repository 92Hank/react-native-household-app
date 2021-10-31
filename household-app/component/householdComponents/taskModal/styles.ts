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
        color: "black",
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
        color: "black",
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    centeredViewBlurred: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor: "#f2f2f2",
        height: "80%",
        width: "95%",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalTextView: {
        alignItems: "flex-start",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        minWidth: "100%",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "white",
    },
    modalText: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    container: {
        marginTop: 15,
    },
    textinputTitleRight2: {
        flex: 1,
        justifyContent: "center",
        alignContent: "flex-start",
        top: 55,
        marginLeft: 15,
        marginTop: 0,
        marginRight: 15,
        marginBottom: 5,
        maxHeight: 160,
        minWidth: 360,
        borderRadius: 8,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 10,
    },
    titleContent2: {
        backgroundColor: "white",
        height: 166,
    },
    textinputTitleRight: {
        flex: 1,
        justifyContent: "center",
        alignContent: "flex-end",
        top: 55,
        marginLeft: 15,
        marginTop: 0,
        marginRight: 15,
        marginBottom: 0,
        maxHeight: 60,
        minWidth: 360,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 10,
    },
    titleContent: {
        backgroundColor: "white",
    },
    buttonsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    closeButton: {
        backgroundColor: "white",
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
        borderBottomRightRadius: 20,
        borderStartWidth: 1,
        borderStartColor: "gainsboro",
    },
    saveButton: {
        backgroundColor: "white",
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
    householdButtonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
    inputsCard: {
        backgroundColor: "white",
        width: windowWidth - 50,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 10,
    },
    inputsCard2: {
        backgroundColor: "white",
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
        elevation: 10,
    },
    input: {
        backgroundColor: "#ffff",
        width: windowWidth - 50,
        marginTop: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 10,
    },
    input2: {
        backgroundColor: "#ffff",
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
    input2TextColor: {
        color: "gray",
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
    },
    clickedDayTitle: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    clickedDayTitleSub: {
        color: "gray",
        fontSize: 14,
        justifyContent: "center",
        textAlign: "center",
    },
    buttonText: {
        color: "black",
        fontSize: 16,
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
        backgroundColor: "#f2f2f2",
        margin: 2,
    },
    circleBtnText: {
        color: "white",
        fontSize: 14,
        justifyContent: "center",
        textAlign: "center",
    },
    circleBtnTextValue: {
        color: "black",
        fontSize: 14,
        justifyContent: "center",
        textAlign: "center",
    },
    householdButton: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "50%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        borderBottomWidth: 1,
        borderBottomColor: "gainsboro",
    },
    householdButton2: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "50%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        borderStartWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "gainsboro",
        borderStartColor: "gainsboro",
    },
    modalView2: {
        // margin: 20,
        width: 300,
        height: 500,
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalViewDelete: {
        // margin: 20,
        width: 400,
        height: 200,
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText2: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
    },
    saveButtonDelete: {
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "33.3%",
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
    archiveButton: {
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "33.3%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    closeButtonDelete: {
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "33.3%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        borderBottomRightRadius: 20,
        borderStartWidth: 1,
        borderStartColor: "gainsboro",
    },
    warningText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "red",
    },
});

export default styles;
