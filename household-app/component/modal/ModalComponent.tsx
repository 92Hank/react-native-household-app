import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, TextInput } from "react-native-paper";
import styles from "./styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import CircleButtonGroup from "../circleButtonGroup/circleButtonGroup";
import ListItem from "../taskDayListItem/taskDayListItem";
import { useCreateTaskMutation } from "../../Redux/Service/task/taskApi";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import task from "../../Redux/entity/task";
import { LocalIp } from "../../Redux/Config";
import { useAppSelector } from "../../Redux/hooks";

interface Props {
  isOpen: boolean;
  handleAddClose: () => void;
  event: any;
}

interface Task {
  id: string;
  description: string;
  value?: number;
  householdId?: number;
  repeated?: number;
  archived?: boolean;
}

const buttonList: number[] = [1, 2, 4, 6, 8];
const repeatedList = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

type PostSchemaType = Record<keyof Task, Yup.AnySchema>;

const PostSchema = Yup.object().shape<PostSchemaType>({
  id: Yup.string()
    .required("Title is required")
    .min(6, "Minimum 6 characters")
    .trim(),
  description: Yup.string().required().min(6, "Minimum 6 characters").trim(),
  value: Yup.number(),
  householdId: Yup.number(),
  repeated: Yup.number(),
  archived: Yup.boolean(),
});

const recurring = 2;

const ModalComponent: React.FC<Props> = ({
  isOpen,
  handleAddClose,
  event,
}) => {
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [repeated, setRepeated] = useState<number>();
  const [value, setValue] = useState<number>();
  const [isClicked, setIsClicked] = useState(true);
  const [isClickedDays, setIsClickedDays] = useState(true);

  const onChangeInputName = (name: string) => setName(name);
  const onChangeInputDescription = (description: string) =>
    setDescription(description);
  const currentHousehold = useAppSelector(selectSelectedHousehold);
  // console.log(currentHousehold);

  const defaultTask: task = {
    description: "Make food",
    archived: false,
    name: "cook",
    repeated: 0,
    value: 0,
    houseHoldId: "houseHoldId1",
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
      const requestData: task = {
        houseHoldId: "2",
        description: description,
        name: name,
        repeated: repeated,
        value: value,
        archived: false,
      };

      CreateTask(requestData);
    } else {
      alert("APAPAP! Du måste ange ett namn och välja en avatar!");
    }
    console.log(createTaskItem);
  };

  const onPress2 = (i: Number) => {
    console.log("onPress works fine");
    setIsClicked(true);
    console.log(i);
    setValue(i as number);
    //do some stuff here
    // need to pass repeated here to CircleButtonGroup.tsx
    // onChangeInputRepeated;
  };
  const onPressDays = (event: any) => {
    console.log("onPress works fine");
    setIsClickedDays(true);
  }
  const onPressRepeated = (i: Number) => {
    console.log("onPress works fine");
    setIsClicked(true);
    console.log(i);
    setRepeated(i as number);
    //do some stuff here
    // need to pass repeated here to CircleButtonGroup.tsx
    // onChangeInputRepeated;
  };

  const onSave = async () => {
    if (name && description) {
      const requestData = {
        description: description,
        name: name,
        repeated: repeated,
        value: value,
        householdId: currentHousehold // check the controller
      };

      const rawResponse = await fetch(
        LocalIp + "/react-native-household-app/us-central1/webApi/task",
        {
          method: "POST",
          body: JSON.stringify(requestData),
          headers: {
            Accept: "application/json,text/plain",
            "Content-Type": "application/json",
          },
        }
      );

      if (rawResponse.status === 201) {
        handleAddClose();
      }
    } else {
      alert("APAPAP! Du måste ange ett namn och välja en avatar!");
    }
  };

  return !isClicked || !isClickedDays ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
    >
      <ScrollView
        //  contentContainerStyle={{ flexGrow: 1 }}
        {...(Platform.OS === "ios"
          ? "keyboardDismissMode='interactive'"
          : null)}
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
                <View
                  style={[
                    isOpen ? styles.centeredViewBlurred : styles.centeredView,
                  ]}
                >
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

                      <Card style={styles.inputsCard}>
                        <Card.Content>
                          <View style={styles.clickedDay}>
                            {/* <ListItem
                              onPressDays={onPressDays}
                              event={event}
                            /> */}
                            <View style={styles.buttonsCircleContainer}>
                              <FlatList
                                horizontal
                                data={repeatedList}
                                renderItem={({ item }) => (
                                  <TouchableOpacity
                                    key={item}
                                    style={styles.repeatedCircleButton}
                                    onPress={() => onPressRepeated(item)}
                                  >
                                    <Text style={styles.repeatedCircleBtnText}>
                                      {item}
                                    </Text>
                                  </TouchableOpacity>
                                )}
                                showsHorizontalScrollIndicator={false}
                              />
                            </View>
                          </View>
                        </Card.Content>
                      </Card>
                      <Card style={styles.inputsCard2}>
                        <Card.Content>
                          <View style={styles.buttonsCircleContainer}>
                            {buttonList.map(( i) => (
                              <TouchableOpacity
                                key={i}
                                style={styles.buttonsCircleButton}
                                onPress={() => onPress2(i)}
                              >
                                <Text style={styles.buttonsCircleBtnText}>
                                  {i}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </Card.Content>
                      </Card>
                    </View>

                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        onPress={handleSubmit as any}
                        style={styles.saveButton}
                      >
                        <MaterialIcons
                          name="add-circle-outline"
                          size={30}
                          color="black"
                        />
                        <Text style={styles.householdButtonText}>Spara</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={handleAddClose}
                        style={styles.closeButton}
                      >
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
  ) : (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
    >
      <ScrollView
        //  contentContainerStyle={{ flexGrow: 1 }}
        {...(Platform.OS === "ios"
          ? "keyboardDismissMode='interactive'"
          : null)}
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
                <View
                  style={[
                    isOpen ? styles.centeredViewBlurred : styles.centeredView,
                  ]}
                >
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

                      <Card style={styles.inputsCard}>
                        <Card.Content>
                          <View style={styles.clickedDay}>
                            <View style={styles.clickedDayTitle}>
                              <Text style={styles.buttonText}>
                                Återkommer:{" "}
                              </Text>
                            </View>
                            <View style={styles.clickedDayReturn}>
                              <Text style={{ marginRight: 3 }}>Var</Text>
                              <TouchableOpacity
                                style={styles.circleButton}
                                onPress={() => {
                                  setIsClickedDays(false);
                                }}
                              >
                                <Text style={styles.circleBtnText}>
                                  {recurring}
                                </Text>
                              </TouchableOpacity>
                              <Text style={{ marginLeft: 3 }}>dag</Text>
                            </View>
                          </View>
                        </Card.Content>
                      </Card>
                      <Card style={styles.inputsCard2}>
                        <Card.Content>
                          <View style={styles.clickedDay}>
                            <View style={styles.clickedDayTitle}>
                              <Text style={styles.buttonText}>Värde: </Text>
                              <Text style={styles.clickedDayTitleSub}>
                                Hur energikrävande är sysslan?
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={styles.circleButtonValue}
                              onPress={() => {
                                setIsClicked(false);
                              }}
                            >
                              <Text style={styles.circleBtnTextValue}>
                                {recurring}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </Card.Content>
                      </Card>
                    </View>

                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        onPress={onSave}
                        style={styles.saveButton}
                      >
                        <MaterialIcons
                          name="add-circle-outline"
                          size={30}
                          color="black"
                        />
                        <Text style={styles.householdButtonText}>Spara</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={handleAddClose}
                        style={styles.closeButton}
                      >
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
