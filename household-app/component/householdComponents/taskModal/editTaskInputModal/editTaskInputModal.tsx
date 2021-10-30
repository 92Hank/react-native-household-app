import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Modal, FlatList } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { task } from "../../../../../Common/task";
import { valueType } from "../../../../../Common/value";
import { snackbarContext } from "../../../../context/snackBarContext";
import { selectSelectedHousehold } from "../../../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../../../Redux/hooks";
import { useEditTaskMutation } from "../../../../Redux/Service/task/taskApi";
import styles from "../styles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import SnackbarComponent from "../../../snackbar/snackbarComponent";

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
    openEdit: boolean;
    handleModalClose: () => void;
    task: TaskNow;
    handleClose: () => void;
}

const buttonList: number[] = [1, 2, 4, 6, 8];
const repeatedList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const EditTaskInputModal = (props: Props) => {
    const currentHousehold = useAppSelector(selectSelectedHousehold);
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

    const [
        editTask, // This is the mutation trigger

        { isSuccess: successEdit, error: errorEdit }, // This is the destructured mutation result
    ] = useEditTaskMutation();

    const defaultTask: task = {
        description: props.task?.description as string,
        archived: false,
        name: props.task?.name as string,
        repeated: props.task?.repeated as number,
        value: props.task?.value as valueType,
        houseHoldId: props.task?.householdId as string,
        createdAt: new Date(),
    };

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
        }
    }, [successEdit]);

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
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.openEdit}
            onRequestClose={() => {
                props.openEdit;
            }}
        >
            <View style={[props.openEdit ? styles.centeredViewBlurred : styles.centeredView]}>
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
                        <TouchableOpacity onPress={props.handleClose} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close-circle-outline" size={30} color="black" />
                            <Text style={styles.buttonText}>Stäng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default EditTaskInputModal;
