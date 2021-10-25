import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { Feather } from "@expo/vector-icons";

interface TaskNow {
    id?: string;
    name: string;
    householdId?: string;
    description?: string;
    repeated?: number;
    archived?: boolean;
    value?: number;
    emojiList?: string[];
}

interface Props {
    isOpen: boolean;
    handleModalClose: () => void;
    task: TaskNow;
}

function TaskModal(props: Props) {
    const user = useAppSelector(selectCurrentLoginUser);
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [rights, setRights] = useState(false);

    const onSave = () => {
        console.log("mark task as done");
    };

    const handleEditClick = () => {
        console.log("open new modal for edit");
    };

    const handleDeleteClick = () => {
        console.log("delete task api");
    };

    useEffect(() => {
        currentHousehold?.member.forEach((m) => {
            if (m.userId === user?.id && m.isOwner) {
                setRights(true);
            }
        });
    }, [rights]);

    return (
        <View style={styles.centeredView}>
            {props.task && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.isOpen}
                    onRequestClose={() => {
                        props.isOpen;
                    }}
                >
                    <View style={[props.isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Syssla:
                                <Text style={styles.modalText}>{" " + props.task.description}</Text>
                            </Text>
                            <Text style={styles.modalText}>
                                Beskriving:
                                <Text style={styles.modalText}>{" " + props.task.description}</Text>
                            </Text>
                            {rights && (
                                <View>
                                    <View style={styles.buttonsContainer}>
                                        <TouchableOpacity onPress={handleEditClick} style={styles.householdButton}>
                                            <Feather name="edit-2" size={30} color="black" />
                                            <Text style={styles.householdButtonText}>Ändra</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleDeleteClick} style={styles.householdButton}>
                                            <MaterialIcons name="delete" size={30} color="black" />
                                            <Text style={styles.householdButtonText}>Radera</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => onSave()} style={styles.saveButton}>
                                    <MaterialIcons name="add-circle-outline" size={30} color="black" />
                                    <Text style={styles.buttonText}>Spara</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={props.handleModalClose} style={styles.closeButton}>
                                    <MaterialCommunityIcons name="close-circle-outline" size={30} color="black" />
                                    <Text style={styles.buttonText}>Stäng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

export default TaskModal;

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#ffff",
        width: "100%",
        marginBottom: 15,
    },
    householdButton: {
        margin: 15,
        backgroundColor: "white",
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
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
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
    buttonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
});