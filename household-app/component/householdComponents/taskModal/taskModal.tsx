/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
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
import { task } from "../../../../Common/task";
import { Card, TextInput } from "react-native-paper";
import SnackbarComponent from "../../snackbar/snackbarComponent";
import { Surface } from "react-native-paper";
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

const buttonList: number[] = [1, 2, 4, 6, 8];
const repeatedList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

function TaskModal(props: Props) {
    const user = useAppSelector(selectCurrentLoginUser);
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [rights, setRights] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const { setSnackbar, isVisible, message } = useContext(snackbarContext);
    const [name, setName] = useState<string>(props.task?.name as string);
    const [description, setDescription] = useState<string>(props.task?.description as string);
    const [repeated, setRepeated] = useState<number>();
    const [value, setValue] = useState<number>();
    const [isClicked, setIsClicked] = useState(true);
    const [isClickedDays, setIsClickedDays] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const onChangeInputName = (name: string) => setName(name);
    const onChangeInputDescription = (description: string) => setDescription(description);

    const defaultTask: task = {
        description: props.task?.description as string,
        archived: false,
        name: props.task?.name as string,
        repeated: props.task?.repeated as number,
        value: props.task?.value as valueType,
        houseHoldId: props.task?.householdId as string,
        createdAt: new Date(),
    };

    const [
        createDoneTask, // This is the mutation trigger
        { status, isSuccess, error, isLoading }, // This is the destructured mutation result
    ] = useCreateDoneTaskMutation();

    const [
        editTask, // This is the mutation trigger

        { isSuccess: successEdit, error: errorEdit }, // This is the destructured mutation result
    ] = useEditTaskMutation();

    const [deleteTask, { isSuccess: isDeleted, error: deleteError }] = useDeleteTaskMutation();
    const [archiveTask, { isSuccess: isArchived, error: archivedError }] = useArchiveTaskMutation();

    useEffect(() => {
        if (isSuccess) {
            props.handleModalClose();
            setSnackbar("Bra jobbat!", true);
        }
    }, [isSuccess]);

    useEffect(() => {
        setDescription(defaultTask.description);
        setName(defaultTask.name);
        setValue(defaultTask.value);
        setRepeated(defaultTask.repeated);
    }, []);

    useEffect(() => {
        if (isArchived) {
            props.handleModalClose();
            setSnackbar("Syssla arkiverad", true);
        }
    }, [isArchived]);

    useEffect(() => {
        if (errorEdit) {
            props.handleModalClose();
            setSnackbar("error", true);
            console.log("fel " + errorEdit);
        }
    }, [errorEdit]);

    useEffect(() => {
        if (successEdit) {
            props.handleModalClose();
            setSnackbar("success", true);
            console.log("success" + successEdit);
            setOpenEdit(false);
        }
    }, [successEdit]);

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

    const onEdit = () => {
        console.log("edit api");
        if (name && description && repeated && value) {
            const v = value as valueType;
            const requestData: task = {
                houseHoldId: currentHousehold?.id as string,
                description: description,
                name: name,
                repeated: repeated,
                value: v,
                archived: false,
                id: props.task.id,
            };
            console.log("------- Edit Form -------");
            console.log("repeated: " + repeated);
            console.log("description: " + description);
            console.log("name: " + name);
            console.log("value: " + value);
            console.log("household: " + currentHousehold?.id);
            console.log("------- End of Edit Form -------");
            editTask(requestData);
        } else {
            setSnackbar("Fyll i alla värden", true);
        }
        setIsEditing(isEditing);
        // setIsClickedDays(false);
        // setIsClicked(false);
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

    const onPress2 = (i: number) => {
        console.log("onPress works fine");
        setIsClicked(true);
        console.log(i);
        setValue(i as number);
    };
    const onPressRepeated = (i: number) => {
        console.log("onPress works fine");
        setIsClickedDays(true);
        console.log(i);
        setRepeated(i as number);
    };

    useEffect(() => {
        currentHousehold?.member.forEach((m) => {
            if (m.userId === user?.id && m.isOwner) {
                setRights(true);
            }
        });
    }, [rights]);

    const repeatedInput = (
        <Card style={styles.inputsCard}>
            <Card.Content>
                <View style={styles.clickedDay}>
                    <View style={styles.buttonsCircleContainer}>
                        <FlatList
                            horizontal
                            data={repeatedList}
                            keyExtractor={(index) => "key" + index}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.repeatedCircleButton}
                                    onPress={() => onPressRepeated(item)}
                                >
                                    <Text style={styles.repeatedCircleBtnText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Card.Content>
        </Card>
    );

    const repeatedValue = (
        <Card style={styles.inputsCard}>
            <Card.Content>
                <View style={styles.clickedDay}>
                    <View style={styles.clickedDayTitle}>
                        <Text style={styles.buttonText}>Återkommer: </Text>
                    </View>
                    <View style={styles.clickedDayReturn}>
                        <Text style={{ marginRight: 3 }}>Var</Text>
                        <TouchableOpacity
                            style={styles.circleButton}
                            onPress={() => {
                                setIsClickedDays(false);
                            }}
                        >
                            <Text style={styles.circleBtnText}>{repeated ? repeated : defaultTask.repeated}</Text>
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 3 }}>dag</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );

    const valueInput = (
        <Card style={styles.inputsCard2}>
            <Card.Content>
                <View style={styles.buttonsCircleContainer}>
                    {buttonList.map((i) => (
                        <TouchableOpacity key={i} style={styles.buttonsCircleButton} onPress={() => onPress2(i)}>
                            <Text style={styles.buttonsCircleBtnText}>{i}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Card.Content>
        </Card>
    );
    const valueForTask = (
        <Card style={styles.inputsCard2}>
            <Card.Content>
                <View style={styles.clickedDay}>
                    <View style={styles.clickedDayTitle}>
                        <Text style={styles.buttonText}>Värde: </Text>
                        <Text style={styles.clickedDayTitleSub}>Hur energikrävande är sysslan?</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.circleButtonValue}
                        onPress={() => {
                            setIsClicked(false);
                        }}
                    >
                        <Text style={styles.circleBtnTextValue}>{value ? value : defaultTask.value}</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );

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
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={openEdit}
                        onRequestClose={() => {
                            openEdit;
                        }}
                    >
                        <View style={[openEdit ? styles.centeredViewBlurred : styles.centeredView]}>
                            <View style={styles.modalView}>
                                <SnackbarComponent isVisible={isVisible} message={message} />
                                <View style={styles.modalTextView}>
                                    <Text style={styles.modalText}>Ändra syssla</Text>
                                </View>
                                <View
                                    style={{
                                        position: "absolute",
                                        alignItems: "center",
                                        marginTop: 25,
                                    }}
                                >
                                    <TextInput
                                        defaultValue={defaultTask.name}
                                        theme={{ roundness: 10 }}
                                        outlineColor="white"
                                        mode="outlined"
                                        style={styles.input}
                                        label="Titel"
                                        onChangeText={(text) => onChangeInputName(text)}
                                    />
                                    <TextInput
                                        defaultValue={defaultTask.description}
                                        theme={{ roundness: 10 }}
                                        outlineColor="white"
                                        mode="outlined"
                                        style={styles.input2}
                                        label="Beskrivning"
                                        onChangeText={(text) => onChangeInputDescription(text)}
                                    />

                                    {!isClickedDays ? repeatedInput : repeatedValue}

                                    {!isClicked ? valueInput : valueForTask}
                                </View>
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity onPress={() => onEdit()} style={styles.saveButton}>
                                        <MaterialIcons name="check-circle" size={30} color="black" />
                                        <Text style={styles.buttonText}>Ändra</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setOpenEdit(false)} style={styles.closeButton}>
                                        <MaterialCommunityIcons name="close-circle-outline" size={30} color="black" />
                                        <Text style={styles.buttonText}>Stäng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
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
                                <TouchableOpacity onPress={() => onSave()} style={styles.saveButton}>
                                    <MaterialIcons name="check-circle" size={30} color="black" />
                                    <Text style={styles.buttonText}>Klar</Text>
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
