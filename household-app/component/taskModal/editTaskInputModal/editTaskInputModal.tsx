import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Modal, FlatList, View, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import { TextInput, Surface, Text } from "react-native-paper";
import { task } from "../../../../Common/task";
import { valueType } from "../../../../Common/value";
import { snackbarContext } from "../../../context/snackBarContext";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { useEditTaskMutation } from "../../../Redux/Service/task/taskApi";
import styles from "./styles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import SnackbarComponent from "../../snackbar/snackbarComponent";
import * as Yup from "yup";
import { Formik } from "formik";
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

interface inputTask {
    description?: string;
    name: string;
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

type PostSchemaType = Record<keyof inputTask, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
    name: Yup.string()
        .min(3, ({ min }) => `minst ${min} bokstäver!`)
        .max(20, ({ max }) => `max ${max} bokstäver!`)
        .required("Titel måste fyllas i!"),
    description: Yup.string()
        .min(3, ({ min }) => `minst ${min} bokstäver!`)
        .max(120, ({ max }) => `max ${max} bokstäver!`)
        .required("Beskrivning måste fyllas i!"),
});

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
    const { colors } = useTheme();

    const [
        editTask, // This is the mutation trigger

        { isSuccess: successEdit, error: errorEdit }, // This is the destructured mutation result
    ] = useEditTaskMutation();

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

    useEffect(() => {
        setDescription(defaultTask.description);
        setName(defaultTask.name);
        setValue(defaultTask.value);
        setRepeated(defaultTask.repeated);
    }, []);

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

    const onEdit = (task: inputTask) => {
        console.log("edit api");
        console.log(task);
        if (name && description && repeated && value) {
            const v = value as valueType;
            const requestData: task = {
                houseHoldId: currentHousehold?.id as string,
                description: task.description as string,
                name: task.name,
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
        <Surface style={styles.inputsCard}>
            <Surface style={styles.clickedDay}>
                <Surface style={styles.buttonsCircleContainer}>
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
                </Surface>
            </Surface>
        </Surface>
    );

    const repeatedValue = (
        <Surface style={styles.inputsCard}>
            <Surface style={styles.clickedDay}>
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
            </Surface>
        </Surface>
    );

    const valueInput = (
        <Surface style={styles.inputsCard2}>
            <Surface style={styles.buttonsCircleContainer}>
                {buttonList.map((i) => (
                    <TouchableOpacity
                        key={i}
                        style={{ ...styles.buttonsCircleButton, backgroundColor: colors.contrastColor }}
                        onPress={() => onPress2(i)}
                    >
                        <Text style={styles.buttonsCircleBtnText}>{i}</Text>
                    </TouchableOpacity>
                ))}
            </Surface>
        </Surface>
    );
    const valueForTask = (
        <Surface style={styles.inputsCard2}>
            <Surface style={styles.clickedDay}>
                <View style={styles.clickedDayTitle}>
                    <Text style={styles.buttonText}>Värde: </Text>
                    <Text style={styles.clickedDayTitleSub}>Hur energikrävande är sysslan?</Text>
                </View>
                <TouchableOpacity
                    style={{ ...styles.circleButtonValue, backgroundColor: colors.contrastColor }}
                    onPress={() => {
                        setIsClicked(false);
                    }}
                >
                    <Text style={styles.circleBtnTextValue}>{value ? value : defaultTask.value}</Text>
                </TouchableOpacity>
            </Surface>
        </Surface>
    );

    console.log("defaultTask: =>", defaultTask);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.openEdit}
            onRequestClose={() => {
                props.openEdit;
            }}
        >
            {defaultTask && (
                <Formik
                    validationSchema={validationSchema}
                    initialValues={defaultTask}
                    onSubmit={onEdit}
                    validateOnChange={false}
                >
                    {({ errors, handleChange, handleSubmit, touched }) => (
                        <Surface style={[props.openEdit ? styles.centeredViewBlurred : styles.centeredView]}>
                            <Surface style={{ ...styles.modalView, backgroundColor: colors.contrastColor }}>
                                <SnackbarComponent isVisible={isVisible} message={message} />
                                <Surface style={styles.modalTextView}>
                                    <Text style={styles.modalText}>Ändra syssla</Text>
                                </Surface>
                                <ScrollView
                                    contentContainerStyle={styles.scrollableView}
                                    style={
                                        {
                                            // position: "absolute",
                                            // alignItems: "center",
                                            // marginTop: 25,
                                        }
                                    }
                                >
                                    <TextInput
                                        defaultValue={defaultTask.name || "Pelle"}
                                        theme={{ roundness: 10 }}
                                        outlineColor="white"
                                        mode="outlined"
                                        style={{ ...styles.input, backgroundColor: colors.inputColor }}
                                        label="Titel"
                                        onChangeText={handleChange<keyof inputTask>("name")}
                                        textAlign={"center"}
                                    />
                                    {errors.name && touched.name && (
                                        <Text style={{ fontSize: 10, color: "red" }}>{errors.name}</Text>
                                    )}
                                    <TextInput
                                        defaultValue={defaultTask.description || "Pelle"}
                                        theme={{ roundness: 10 }}
                                        outlineColor="white"
                                        mode="outlined"
                                        style={{ ...styles.input2, backgroundColor: colors.inputColor }}
                                        label="Beskrivning"
                                        onChangeText={handleChange<keyof inputTask>("description")}
                                        textAlign={"center"}
                                    />
                                    {errors.description && touched.description && (
                                        <Text style={{ fontSize: 10, color: "red" }}>{errors.description}</Text>
                                    )}
                                    {!isClickedDays ? repeatedInput : repeatedValue}

                                    {!isClicked ? valueInput : valueForTask}
                                </ScrollView>
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        style={{
                                            ...styles.saveButton,
                                            backgroundColor: colors.blackWhiteToggle,
                                        }}
                                    >
                                        <MaterialIcons name="check-circle" size={30} color={colors.whiteBlackToggle} />
                                        <Text style={styles.buttonText}>Ändra</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={props.handleClose}
                                        style={{
                                            ...styles.closeButton,
                                            backgroundColor: colors.blackWhiteToggle,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="close-circle-outline"
                                            size={30}
                                            color={colors.whiteBlackToggle}
                                        />
                                        <Text style={styles.buttonText}>Stäng</Text>
                                    </TouchableOpacity>
                                </View>
                            </Surface>
                        </Surface>
                    )}
                </Formik>
            )}
        </Modal>
    );
};

export default EditTaskInputModal;
