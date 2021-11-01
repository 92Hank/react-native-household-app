/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { Feather } from "@expo/vector-icons";
import { doneTask } from "../../../../Common/doneTask";
import { useCreateDoneTaskMutation } from "../../../Redux/Service/doneTask/doneTaskApi";
import { useDeleteTaskMutation } from "../../../Redux/Service/task/taskApi";
import { useArchiveTaskMutation } from "../../../Redux/Service/task/taskApi";
import { snackbarContext } from "../../../context/snackBarContext";
import styles from "./styles";
import { valueType } from "../../../../Common/value";
import EditTaskInputModal from "./editTaskInputModal/editTaskInputModal";
import { ActivityIndicator, Colors, Surface, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

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
    const { setSnackbar } = useContext(snackbarContext);
    const { colors } = useTheme();

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
        <Surface style={styles.centeredView}>
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
                        <Surface style={[openDelete ? styles.centeredViewBlurred : styles.centeredView]}>
                            <Surface style={{ ...styles.modalViewDelete, backgroundColor: colors.contrastColor }}>
                                <Text style={styles.warningText}>
                                    Varning! Arkivera sysslan om du vill ha kvar den i statistiken
                                </Text>
                                <Surface style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        onPress={() => onDelete()}
                                        style={{ ...styles.saveButtonDelete, backgroundColor: colors.blackWhiteToggle }}
                                    >
                                        <MaterialIcons name="delete" size={30} color={colors.whiteBlackToggle} />
                                        <Text style={styles.buttonText}>Radera</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => onArchive()}
                                        style={{ ...styles.archiveButton, backgroundColor: colors.blackWhiteToggle }}
                                    >
                                        <MaterialCommunityIcons
                                            name="archive"
                                            size={30}
                                            color={colors.whiteBlackToggle}
                                        />
                                        <Text style={styles.buttonText}>Arkivera</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => onClose()}
                                        style={{
                                            ...styles.closeButtonDelete,
                                            backgroundColor: colors.blackWhiteToggle,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="close"
                                            size={30}
                                            color={colors.whiteBlackToggle}
                                        />
                                        <Text style={styles.buttonText}>Stäng</Text>
                                    </TouchableOpacity>
                                </Surface>
                            </Surface>
                        </Surface>
                    </Modal>
                    <Surface style={[props.isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                        <Surface style={{ ...styles.modalView2, backgroundColor: colors.contrastColor }}>
                            <Surface style={styles.modalTextView}>
                                <Text style={styles.modalText}>{props.task.name}</Text>
                            </Surface>
                            <Surface
                                style={{
                                    // position: "absolute",
                                    // justifyContent: "center",
                                    alignItems: "flex-start",
                                    marginTop: 90,
                                    width: "100%",
                                    padding: 20,
                                    // backgroundColor: colors.myOwnColor,
                                }}
                            >
                                {/* <Text style={styles.modalText2}>
                                    Syssla:
                                    <Text style={styles.modalText2}>{" " + props.task.name}</Text>
                                </Text> */}
                                <Text style={styles.modalText2}>Beskrivning:</Text>
                                <Text style={styles.taskText}>{props.task.description}</Text>
                                <Text style={styles.modalText2}>Återkommer:</Text>
                                {props.task.repeated === 1 ? (
                                    <Text style={styles.taskText}>{"Varje dag"}</Text>
                                ) : (
                                    <Text style={styles.taskText}>{"Var " + props.task.repeated + " dag"}</Text>
                                )}
                                <Text style={styles.modalText2}>Värde:</Text>
                                <Text style={styles.taskText}>{props.task.value}</Text>
                            </Surface>
                            {rights && (
                                <Surface
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
                                    <TouchableOpacity
                                        onPress={handleEditClick}
                                        style={{ ...styles.householdButton, backgroundColor: colors.blackWhiteToggle }}
                                    >
                                        <Feather name="edit-2" size={30} color={colors.whiteBlackToggle} />
                                        <Text style={styles.householdButtonText}>Ändra</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleDeleteClick}
                                        style={{ ...styles.householdButton2, backgroundColor: colors.blackWhiteToggle }}
                                    >
                                        <MaterialIcons name="delete" size={30} color={colors.whiteBlackToggle} />
                                        <Text style={styles.householdButtonText}>Radera</Text>
                                    </TouchableOpacity>
                                </Surface>
                            )}
                            <Surface style={styles.buttonsContainer}>
                                {!isLoading ? (
                                    <TouchableOpacity
                                        onPress={() => onSave()}
                                        style={{ ...styles.saveButton, backgroundColor: colors.blackWhiteToggle }}
                                    >
                                        <MaterialIcons name="check-circle" size={30} color={colors.whiteBlackToggle} />
                                        <Text style={styles.buttonText}>Klar</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={{ ...styles.saveButton, backgroundColor: colors.blackWhiteToggle }}
                                    >
                                        <ActivityIndicator animating={isLoading} color={Colors.tealA200} />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    onPress={props.handleModalClose}
                                    style={{ ...styles.closeButton, backgroundColor: colors.blackWhiteToggle }}
                                >
                                    <MaterialCommunityIcons
                                        name="close-circle-outline"
                                        size={30}
                                        color={colors.whiteBlackToggle}
                                    />
                                    <Text style={styles.buttonText}>Stäng</Text>
                                </TouchableOpacity>
                            </Surface>
                        </Surface>
                    </Surface>
                </Modal>
            )}
        </Surface>
    );
}

export default TaskModal;
