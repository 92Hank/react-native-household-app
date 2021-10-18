import React, { useState } from "react";
import {
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
import { MainRoutes } from "../../routes/routes";

interface Props {
    isOpen: boolean;
    handleAddClose: () => void;
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

export default function ModalComponent( props: Props) {
  const defaultTask: Task = { id: "", description: "" };
  const navigation = useNavigation();
  const handleSubmitForm = async (task: Task) => {
    console.log(task);

    // to api
  };


  return (
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
                visible={props.isOpen}
                onRequestClose={() => {
                  props.isOpen;
                }}
              >
                <View
                  style={[
                    props.isOpen
                      ? styles.centeredViewBlurred
                      : styles.centeredView,
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
                      <View style={styles.textinputTitleRight}>
                        <TextInput
                          theme={{ roundness: 10 }}
                          mode="outlined"
                          style={styles.titleContent}
                          label="Titel"
                          outlineColor="white"
                          onChangeText={handleChange<keyof Task>("id")}
                          value={values.id}
                        />
                      </View>

                      <View style={styles.container}>
                        <View style={styles.textinputTitleRight2}>
                          <TextInput
                            theme={{ roundness: 10 }}
                            mode="outlined"
                            style={styles.titleContent2}
                            label="Beskrivning"
                            outlineColor="white"
                            onChangeText={handleChange<keyof Task>(
                              "description"
                            )}
                            value={values.description}
                          />
                        </View>
                      </View>

                      <Card style={styles.inputsCard}>
                        <Card.Content>
                          <Text>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                              Återkommer:
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                              {" "}
                              var {recurring} dag
                            </Text>
                          </Text>
                        </Card.Content>
                      </Card>
                      <Card style={styles.inputsCard2}>
                        <Card.Title
                          title="Värde: "
                          subtitle="Hur energikrävande är sysslan?"
                        />
                        <Card.Content>
                          <Text style={{ fontSize: 16 }}> 1</Text>
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
                        onPress={props.handleAddClose}
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
