import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Modal, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Colors, Surface, Text, TextInput, useTheme } from "react-native-paper";
import * as Yup from "yup";
import { task } from "../../../../Common/task";
import { valueType } from "../../../../Common/value";
import { snackbarContext } from "../../../context/snackBarContext";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { useCreateTaskMutation } from "../../../Redux/Service/task/taskApi";
import SnackbarComponent from "../../snackbar/snackbarComponent";
import styles from "./styles";

interface Props {
    isOpen: boolean;
    handleAddClose: () => void;
}

interface inputTask {
    description?: string;
    name: string;
}

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

const buttonList: number[] = [1, 2, 4, 6, 8];
const repeatedList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const AddTaskModal: React.FC<Props> = ({ isOpen, handleAddClose }) => {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [repeated, setRepeated] = useState<number>();
    const [value, setValue] = useState<number>();
    const [isClicked, setIsClicked] = useState(true);
    const [isClickedDays, setIsClickedDays] = useState(true);
    const { setSnackbar, isVisible, message } = useContext(snackbarContext);
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const { colors } = useTheme();

    const [
        CreateTask, // This is the mutation trigger

        { status, isSuccess, error, isLoading }, // This is the destructured mutation result
    ] = useCreateTaskMutation();

    const defaultTask: task = {
        description: "",
        archived: false,
        name: "",
        repeated: 0,
        value: 1,
        houseHoldId: "houseHoldId1",
        createdAt: new Date(),
    };

    useEffect(() => {
        if (isSuccess) {
            setSnackbar("Skapat ny syssla", true);
            setName("");
            setDescription("");
            setValue(undefined);
            setRepeated(undefined);
            handleAddClose();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            console.log("error", error);
            setSnackbar("error", true);
        }
    }, [error]);

    const handleSubmitForm = (task: inputTask) => {
        if (task.name && task.description && repeated && value) {
            const v = value as valueType;
            const requestData: task = {
                houseHoldId: currentHousehold?.id as string,
                description: task.description as string,
                name: task.name,
                repeated: repeated,
                value: v,
                archived: false,
            };
            CreateTask(requestData);
            task.name = "";
            task.description = "";
        } else {
            setSnackbar("Fyll i alla värden", true);
        }
    };

    const onPress2 = (i: number) => {
        setIsClicked(true);
        setValue(i as number);
    };
    const onPressRepeated = (i: number) => {
        setIsClickedDays(true);
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

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} enabled>
            <ScrollView
                {...(Platform.OS === "ios" ? "keyboardDismissMode='interactive'" : null)}
                keyboardShouldPersistTaps={"handled"}
            >
                <Formik
                    validationSchema={validationSchema}
                    initialValues={defaultTask}
                    onSubmit={handleSubmitForm}
                    validateOnChange={false}
                >
                    {({ errors, values, handleChange, handleSubmit, touched }) => (
                        <Surface style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isOpen}
                                onRequestClose={() => {
                                    isOpen;
                                }}
                            >
                                <Surface style={[isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                                    <Surface style={{ ...styles.modalView, backgroundColor: colors.contrastColor }}>
                                        <SnackbarComponent isVisible={isVisible} message={message} />
                                        <Surface style={styles.modalTextView}>
                                            <Text style={styles.modalText}>Skapa en ny syssla</Text>
                                        </Surface>
                                        <View>
                                            <TextInput
                                                defaultValue={""}
                                                theme={{ roundness: 10 }}
                                                outlineColor={colors.blackWhiteToggle}
                                                mode="outlined"
                                                style={{ ...styles.input, backgroundColor: colors.inputColor }}
                                                label="Titel"
                                                value={values.name}
                                                onChangeText={handleChange<keyof inputTask>("name")}
                                                textAlign={"center"}
                                            />
                                            {errors.name && touched.name && (
                                                <Text style={{ fontSize: 10, color: "red" }}>{errors.name}</Text>
                                            )}
                                            <TextInput
                                                defaultValue={""}
                                                theme={{ roundness: 10 }}
                                                outlineColor={colors.blackWhiteToggle}
                                                mode="outlined"
                                                style={{ ...styles.input2, backgroundColor: colors.inputColor }}
                                                label="Beskrivning"
                                                value={values.description}
                                                onChangeText={handleChange<keyof inputTask>("description")}
                                                textAlign={"center"}
                                            />
                                            {errors.description && touched.description && (
                                                <Text style={{ fontSize: 10, color: "red" }}>{errors.description}</Text>
                                            )}
                                            {!isClickedDays ? repeatedInput : repeatedValue}

                                            {!isClicked ? valueInput : valueForTask}
                                        </View>
                                        <View style={styles.buttonsContainer}>
                                            {!isLoading ? (
                                                <TouchableOpacity
                                                    onPress={handleSubmit}
                                                    style={{
                                                        ...styles.saveButton,
                                                        backgroundColor: colors.blackWhiteToggle,
                                                    }}
                                                >
                                                    <MaterialIcons
                                                        name="add-circle-outline"
                                                        size={30}
                                                        color={colors.whiteBlackToggle}
                                                    />
                                                    <Text style={styles.taskButtonText}>Spara</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity
                                                    style={{
                                                        ...styles.saveButton,
                                                        backgroundColor: colors.blackWhiteToggle,
                                                    }}
                                                >
                                                    <ActivityIndicator animating={isLoading} color={Colors.tealA200} />
                                                </TouchableOpacity>
                                            )}
                                            <TouchableOpacity
                                                onPress={handleAddClose}
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
                                                <Text style={styles.taskButtonText}>Stäng</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Surface>
                                </Surface>
                            </Modal>
                        </Surface>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddTaskModal;
