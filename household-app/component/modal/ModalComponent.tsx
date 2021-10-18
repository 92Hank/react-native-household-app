import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import styles from "./styles";

interface Props {
    isOpen: boolean;
    handleAddClose: () => void;
}

const recurring = 7;

export default function ModalComponent( props: Props) {
  return (
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
            props.isOpen ? styles.centeredViewBlurred : styles.centeredView,
          ]}
        >
          <View style={styles.modalView}>
            <View style={styles.modalTextView}>
              <Text style={styles.modalText}>Skapa en ny syssla</Text>
            </View>

            <View style={styles.textinputTitleRight}>
              <TextInput
                style={styles.titleContent}
                multiline={true}
                placeholder="Titel.."
              ></TextInput>
            </View>
            <View style={styles.container}>
              <View style={styles.textinputContainerRight}>
                <TextInput
                  style={styles.taskItemContent}
                  multiline={true}
                  placeholder="Beskrivning.."
                ></TextInput>
              </View>
            </View>

            {/* <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={props.handleAddClose}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight> */}

            <Card style={styles.inputsCard}>
              <Card.Content>
                <Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Återkommer:
                  </Text>
                  <Text style={{ fontSize: 16 }}> var {recurring} dag</Text>
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

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => alert("saved successful")}
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
  );
}
