import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Card, TextInput } from "react-native-paper";
import { task } from "../../../Common/task";
import { valueType } from "../../../Common/value";
import { snackbarContext } from "../../context/snackBarContext";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useCreateTaskMutation } from "../../Redux/Service/task/taskApi";
import SnackbarComponent from "../snackbar/snackbarComponent";
import styles from "./styles";
import { ActivityIndicator, Colors } from "react-native-paper";
import * as Yup from "yup";

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
        .max(20, ({ max }) => `max ${max} bokstäver!`)
        .required("Titel måste fyllas i!"),
    description: Yup.string()
        .max(50, ({ max }) => `max ${max} bokstäver!`)
        .required("Beskrivning måste fyllas i!"),
});

const buttonList: number[] = [1, 2, 4, 6, 8];
const repeatedList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const ModalComponent: React.FC<Props> = ({ isOpen, handleAddClose }) => {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [repeated, setRepeated] = useState<number>();
    const [value, setValue] = useState<number>();
    const [isClicked, setIsClicked] = useState(true);
    const [isClickedDays, setIsClickedDays] = useState(true);
    const { setSnackbar, isVisible, message } = useContext(snackbarContext);
    const currentHousehold = useAppSelector(selectSelectedHousehold);

    const defaultTask: task = {
        description: "",
        archived: false,
        name: "",
        repeated: 0,
        value: 1,
        houseHoldId: "houseHoldId1",
        createdAt: new Date(),
    };

    const [
        CreateTask, // This is the mutation trigger

        { status, isSuccess, error, isLoading }, // This is the destructured mutation result
    ] = useCreateTaskMutation();

    useEffect(() => {
        console.log("isSuccess", isSuccess);
        if (isSuccess) {
            setSnackbar("success", true);
            setName("");
            setDescription("");
            setValue(undefined);
            setRepeated(undefined);
            handleAddClose();
        }
    }, [isSuccess]);

    useEffect(() => {
        console.log("isCreating", isLoading);
    }, [isLoading]);

    useEffect(() => {
        console.log("status", status);
    }, [status]);

    useEffect(() => {
        if (error) {
            console.log("error", error);
            setSnackbar("error", true);
        }
    }, [error]);

    const handleSubmitForm = (task: inputTask) => {
        console.log("create api");
        console.log(task);
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
                            <Text style={styles.circleBtnText}>{repeated}</Text>
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
                        <Text style={styles.circleBtnTextValue}>{value}</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} enabled>
            <ScrollView
                //  contentContainerStyle={{ flexGrow: 1 }}
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
                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isOpen}
                                onRequestClose={() => {
                                    isOpen;
                                }}
                            >
                                <View style={[isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                                    <View style={styles.modalView}>
                                        <SnackbarComponent isVisible={isVisible} message={message} />
                                        <View style={styles.modalTextView}>
                                            <Text style={styles.modalText}>Skapa en ny syssla</Text>
                                        </View>
                                        <View
                                            style={{
                                                position: "absolute",
                                                alignItems: "center",
                                                marginTop: 25,
                                            }}
                                        >
                                            <TextInput
                                                defaultValue={""}
                                                theme={{ roundness: 10 }}
                                                outlineColor="white"
                                                mode="outlined"
                                                style={styles.input}
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
                                                outlineColor="white"
                                                mode="outlined"
                                                style={styles.input2}
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
                                                <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
                                                    <MaterialIcons name="add-circle-outline" size={30} color="black" />
                                                    <Text style={styles.householdButtonText}>Spara</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity style={styles.saveButton}>
                                                    <ActivityIndicator animating={isLoading} color={Colors.tealA200} />
                                                </TouchableOpacity>
                                            )}
                                            <TouchableOpacity onPress={handleAddClose} style={styles.closeButton}>
                                                <MaterialCommunityIcons
                                                    name="close-circle-outline"
                                                    size={30}
                                                    color="black"
                                                />
                                                <Text style={styles.householdButtonText}>Stäng</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ModalComponent;
