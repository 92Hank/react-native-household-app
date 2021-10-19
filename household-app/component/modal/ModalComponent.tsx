import React, { useState } from "react";
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


const recurring = 7;

const ModalComponent: React.FC<Props> = ({
  isOpen,
  handleAddClose,
  event
}) => {
  const [id, setId] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [isClicked, setIsClicked] = useState(true);
  const [isClickedDays, setIsClickedDays] = useState(true);

  const onChangeInputId = (id: string) => setId(id);
  const onChangeInputDescription = (description: string) =>
    setDescription(description);

  const defaultTask: Task = { id: "", description: "" };

  const handleSubmitForm = async () => {
    console.log('id: ' + id);
    console.log('description: ' + description);
    // to api
  };

  const onPress = (event: any) => {
    console.log('onPress works fine');
    setIsClicked(true);
    //do some stuff here
  };

  const onPressDays = (event: any) => {
    console.log("onPress works fine");
    setIsClickedDays(true);
    //do some stuff here
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
                        value={id}
                        label="Titel"
                        onChangeText={onChangeInputId}
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
                            {/* <View style={styles.clickedDayTitle}>
                              <Text style={styles.buttonText}>
                                Återkommer:{" "}
                              </Text>
                            </View>
                            <View style={styles.clickedDayReturn}>
                              <Text style={{ marginRight: 3 }}>Var</Text>
                              <TouchableOpacity
                                style={styles.circleButton}
                                onPress={() => alert("your added value")}
                              >
                                <Text style={styles.circleBtnText}>
                                  {recurring}
                                </Text>
                              </TouchableOpacity>
                              <Text style={{ marginLeft: 3 }}>dag</Text>
                            </View> */}

                            <ListItem
                              days={[
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6",
                                "7",
                                "8",
                                "9",
                              ]}
                              onPressDays={onPressDays}
                              event={event}
                            />
                          </View>
                        </Card.Content>
                      </Card>
                      <Card style={styles.inputsCard2}>
                        <Card.Content>
                          <CircleButtonGroup
                            buttons={["1", "2", "3", "4", "5", "6"]}
                            onPress={onPress}
                            event={event}
                          />
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
                        value={id}
                        label="Titel"
                        onChangeText={onChangeInputId}
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
                            {/* <View style={styles.clickedDayTitle}>
                            <ListItem
                              days={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                              onPress={onPress}
                              event={event}
                            />
                            </View> */}
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
  );
}

export default ModalComponent;