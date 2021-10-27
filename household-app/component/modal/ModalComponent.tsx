import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
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
import { LocalIp } from "../../Redux/Config";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useCreateTaskMutation } from "../../Redux/Service/task/taskApi";
import styles from "./styles";

interface Props {
    isOpen: boolean;
    handleAddClose: () => void;
}

// interface Task {
//     id: string;
//     description: string;
//     value?: number;
//     householdId?: number;
//     repeated?: number;
//     archived?: boolean;
// }

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

    const onChangeInputName = (name: string) => setName(name);
    const onChangeInputDescription = (description: string) => setDescription(description);
    const currentHousehold = useAppSelector(selectSelectedHousehold);

    const defaultTask: task = {
        description: "Make food",
        archived: false,
        name: "cook",
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
        }
    }, [error]);

    const handleSubmitForm = async (createTaskItem: task) => {
        if (name && description && repeated && value) {
            const v = value as valueType;
            const requestData: task = {
                houseHoldId: currentHousehold?.id as string,
                description: description,
                name: name,
                repeated: repeated,
                value: v,
                archived: false,
            };
            console.log("------- Submit Form -------");
            console.log("repeated: " + repeated);
            console.log("description: " + description);
            console.log("name: " + name);
            console.log("value: " + value);
            console.log("household: " + currentHousehold?.id);
            console.log("------- End of Submit Form -------");
            CreateTask(requestData);
        } else {
            // alert("APAPAP! Du måste ange ett namn, beskrivning, värde, återkommande!");
        }
        console.log(createTaskItem);
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

    const onSave = async () => {
        if (name && description) {
            const requestData = {
                description: description,
                name: name,
                repeated: repeated,
                value: value,
                householdId: currentHousehold, // check the controller
            };

            const rawResponse = await fetch(LocalIp + "/react-native-household-app/us-central1/webApi/task", {
                method: "POST",
                body: JSON.stringify(requestData),
                headers: {
                    Accept: "application/json,text/plain",
                    "Content-Type": "application/json",
                },
            });

            if (rawResponse.status === 201) {
                handleAddClose();
            }
        } else {
            // alert("APAPAP! Du måste ange en titel, beskrivning, värde och återkommande dagar!");
        }
        setIsClickedDays(false);
        setIsClicked(false);
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
                <Formik initialValues={defaultTask} onSubmit={handleSubmitForm}>
                    {({ errors, values, handleChange, handleSubmit }) => (
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
                                                theme={{ roundness: 10 }}
                                                outlineColor="white"
                                                mode="outlined"
                                                style={styles.input}
                                                value={name}
                                                label="Titel"
                                                onChangeText={onChangeInputName}
                                            />

                                            <TextInput
                                                theme={{ roundness: 10 }}
                                                outlineColor="white"
                                                mode="outlined"
                                                style={styles.input2}
                                                value={description}
                                                label="Beskrivning"
                                                onChangeText={onChangeInputDescription}
                                            />

                                            {!isClickedDays ? repeatedInput : repeatedValue}

                                            {!isClicked ? valueInput : valueForTask}
                                        </View>
                                        <View style={styles.buttonsContainer}>
                                            <TouchableOpacity onPress={onSave} style={styles.saveButton}>
                                                <MaterialIcons name="add-circle-outline" size={30} color="black" />
                                                <Text style={styles.householdButtonText}>Spara</Text>
                                            </TouchableOpacity>
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
