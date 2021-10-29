/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { Feather } from "@expo/vector-icons";
import { doneTask } from "../../../../Common/doneTask";
import { useCreateDoneTaskMutation } from "../../../Redux/Service/doneTask/doneTaskApi";
import { useDeleteTaskMutation, useEditTaskMutation } from "../../../Redux/Service/task/taskApi";
import { useArchiveTaskMutation } from "../../../Redux/Service/task/taskApi";
import { snackbarContext } from "../../../context/snackBarContext";
import styles from "./styles";
import { valueType } from "../../../../Common/value";
import EditTaskInputModal from "./editTaskInputModal/editTaskInputModal";

import { task } from "../../../../Common/task";
import { Card, TextInput } from "react-native-paper";
import SnackbarComponent from "../../snackbar/snackbarComponent";
import { Surface } from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";
interface TaskNow {
    id?: string;
    name: string;
    householdId?: string;
    description?: string;
    repeated?: number;
    archived?: boolean;
    value?: number;
    emojiList?: number[];
    createdAt: Date;
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
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const { setSnackbar, isVisible, message } = useContext(snackbarContext);

    const [
        createDoneTask, // This is the mutation trigger
        { status, isSuccess, error, isLoading }, // This is the destructured mutation result
    ] = useCreateDoneTaskMutation();

    const [deleteTask, { isSuccess: isDeleted, error: deleteError }] = useDeleteTaskMutation();
    const [archiveTask, { isSuccess: isArchived, error: archivedError }] = useArchiveTaskMutation();

    useEffect(() => {
        if (isSuccess) {
            props.handleModalClose();
            setSnackbar("Bra jobbat!", true);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isArchived) {
            props.handleModalClose();
            setSnackbar("Syssla arkiverad", true);
        }
    }, [isArchived]);

    useEffect(() => {
        if (archivedError) {
            props.handleModalClose();
            setSnackbar("ett oväntat fel dök upp", true);
        }
    }, [archivedError]);

    useEffect(() => {
        if (isDeleted) {
            setSnackbar("Syssla raderad", true);
            props.handleModalClose();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (deleteError) {
            setSnackbar("Ett oväntat fel dök upp", true);
            props.handleModalClose();
        }
    }, [deleteError]);

    const onSave = () => {
        if (props.task.id && props.task.value && user?.id && currentHousehold?.id) {
            const markAsDone: doneTask = {
                taskId: props.task.id,
                userId: user?.id,
                houseHoldId: currentHousehold?.id,
                value: props.task.value as valueType,
            };
            createDoneTask(markAsDone);
        }
    };

    const closeEditModal = () => {
        setOpenEdit(false);
        props.handleModalClose();
    };

    const closeEdit = () => {
        setOpenEdit(false);
    };

    const handleEditClick = () => {
        console.log("open new modal for edit");
        // props.handleModalClose();

        setOpenEdit(true);
    };

    const handleDeleteClick = () => {
        setOpenDelete(true);
        // props.handleModalClose();
    };

    const onDelete = () => {
        console.log("delete task api");
        deleteTask(props.task?.id!);
        setOpenDelete(false);
    };

    const onArchive = () => {
        console.log("archive task api");
        archiveTask(props.task?.id!);
        setOpenDelete(false);
    };

    const onClose = () => {
        console.log("close");
        setOpenDelete(false);
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
                    <EditTaskInputModal
                        openEdit={openEdit}
                        handleModalClose={closeEditModal}
                        task={props.task}
                        handleClose={closeEdit}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={openDelete}
                        onRequestClose={() => {
                            openDelete;
                        }}
                    >
                        <View style={[openDelete ? styles.centeredViewBlurred : styles.centeredView]}>
                            <View style={styles.modalViewDelete}>
                                <Text style={styles.warningText}>
                                    Varning! arkivera sysslan om du vill ha kvar den i statistiken
                                </Text>
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity onPress={() => onDelete()} style={styles.saveButtonDelete}>
                                        <MaterialIcons name="delete" size={30} color="black" />
                                        <Text style={styles.buttonText}>Radera</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onArchive()} style={styles.archiveButton}>
                                        <MaterialCommunityIcons name="archive" size={30} color="black" />
                                        <Text style={styles.buttonText}>Arkivera</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => onClose()} style={styles.closeButtonDelete}>
                                        <MaterialCommunityIcons name="close" size={30} color="black" />
                                        <Text style={styles.buttonText}>Stäng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View style={[props.isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                        <View style={styles.modalView2}>
                            <View style={styles.modalTextView}>
                                <Text style={styles.modalText}>Administrera</Text>
                            </View>
                            <View
                                style={{
                                    position: "absolute",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                    marginTop: 90,
                                }}
                            >
                                <Text style={styles.modalText2}>
                                    Syssla:
                                    <Text style={styles.modalText2}>{" " + props.task.name}</Text>
                                </Text>
                                <Text style={styles.modalText2}>
                                    Beskrivning:
                                    <Text style={styles.modalText2}>{" " + props.task.description}</Text>
                                </Text>
                                <Text style={styles.modalText2}>
                                    Återkommer:
                                    <Text style={styles.modalText2}>{" var " + props.task.repeated + " dag"}</Text>
                                </Text>
                                <Text style={styles.modalText2}>
                                    Värde:
                                    <Text style={styles.modalText2}>{" " + props.task.value}</Text>
                                </Text>
                            </View>
                            {rights && (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        bottom: 70,
                                        left: 0,
                                        right: 0,
                                        alignSelf: "flex-end",
                                        position: "absolute",
                                    }}
                                >
                                    <TouchableOpacity onPress={handleEditClick} style={styles.householdButton}>
                                        <Feather name="edit-2" size={30} color="black" />
                                        <Text style={styles.householdButtonText}>Ändra</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleDeleteClick} style={styles.householdButton2}>
                                        <MaterialIcons name="delete" size={30} color="black" />
                                        <Text style={styles.householdButtonText}>Radera</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            <View style={styles.buttonsContainer}>
                                {!isLoading ? (
                                    <TouchableOpacity onPress={() => onSave()} style={styles.saveButton}>
                                        <MaterialIcons name="check-circle" size={30} color="black" />
                                        <Text style={styles.buttonText}>Klar</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.saveButton}>
                                        <ActivityIndicator animating={isLoading} color={Colors.tealA200} />
                                    </TouchableOpacity>
                                )}
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
