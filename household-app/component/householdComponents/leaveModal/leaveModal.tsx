import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { Surface, Text, useTheme } from "react-native-paper";

interface Props {
    isOpen: boolean;
    handleModalClose: () => void;
    handleLeave: () => void;
}

function LeaveModal(props: Props) {
    const user = useAppSelector(selectCurrentLoginUser);
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [rights, setRights] = useState(false);
    const { colors } = useTheme();
    const [creator, setCreator] = useState(false);

    useEffect(() => {
        currentHousehold?.member.forEach((m) => {
            if (m.userId === user?.id && m.isOwner) {
                setRights(true);
            }
        });
    }, [rights]);

    useEffect(() => {
        if (currentHousehold?.ownerId === user?.id) {
            setCreator(true);
        }
    });

    return (
        <View style={styles.centeredView}>
            {props.isOpen && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.isOpen}
                    onRequestClose={() => {
                        props.isOpen;
                    }}
                >
                    <Surface style={[props.isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                        {!creator ? (
                            <Surface style={{ ...styles.modalView, backgroundColor: colors.contrastColor }}>
                                {/* <Surface style={{ backgroundColor: colors.contrastColor }}> */}

                                <Text style={styles.modalText}>Är du säker du vill lämna hushållet?</Text>
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        onPress={props.handleLeave}
                                        style={{ ...styles.saveButton, backgroundColor: colors.blackWhiteToggle }}
                                    >
                                        <MaterialIcons
                                            name="delete-forever"
                                            size={30}
                                            color={colors.whiteBlackToggle}
                                        />
                                        <Text style={styles.buttonText}>Ja</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={props.handleModalClose}
                                        style={{ ...styles.closeButton, backgroundColor: colors.blackWhiteToggle }}
                                    >
                                        <MaterialCommunityIcons
                                            name="arrow-left-bold"
                                            size={30}
                                            color={colors.whiteBlackToggle}
                                        />
                                        <Text style={styles.buttonText}>Nej</Text>
                                    </TouchableOpacity>
                                </View>
                            </Surface>
                        ) : (
                            <Surface style={{ ...styles.modalView, backgroundColor: colors.contrastColor }}>
                                <Text style={styles.modalText}>Du kan inte lämna ett hushåll som du skapat</Text>
                                <TouchableOpacity
                                    onPress={props.handleModalClose}
                                    style={{ ...styles.backButton, backgroundColor: colors.blackWhiteToggle }}
                                >
                                    <MaterialCommunityIcons
                                        name="arrow-left-bold"
                                        size={30}
                                        color={colors.whiteBlackToggle}
                                    />
                                    <Text style={styles.buttonText}>Stäng</Text>
                                </TouchableOpacity>
                            </Surface>
                        )}
                    </Surface>
                </Modal>
            )}
        </View>
    );
}

export default LeaveModal;

const styles = StyleSheet.create({
    input: {
        // backgroundColor: "#ffff",
        width: "100%",
        marginBottom: 15,
    },
    householdButton: {
        marginTop: 20,
        margin: 5,
        // backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 100,
        width: 140,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    householdButtonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
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
        // margin: 20,
        width: 300,
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
    textStyle: {
        // color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "red",
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
    backButton: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "50%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 50,
        marginTop: 5,
    },
    closeButton: {
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
    buttonText: {
        // color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
    warningText: {
        fontWeight: "bold",
        textAlign: "center",
        color: "red",
    },
});
