import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

interface Props {
    isOpen: boolean;
    handleAddClose: () => void;
}

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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create a Task</Text>
            <View style={styles.textinputTitleRight}>
              <TextInput
                style={styles.titleContent}
                multiline={true}
                placeholder="Title.."
              ></TextInput>
            </View>
            <View style={styles.container}>
              <View style={styles.textinputContainerRight}>
                <TextInput
                  style={styles.taskItemContent}
                  multiline={true}
                  placeholder="Description.."
                ></TextInput>
              </View>
            </View>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={props.handleAddClose}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    height: "80%",
    width: "95%",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    marginTop: 15,
  },
  textinputContainerRight: {
    flex: 1,
    alignContent: "flex-start",
    marginLeft: 15,
    marginTop: 0,
    marginRight: 15,
    marginBottom: 0,
    backgroundColor: "#ffffff",
    maxHeight: 160,
    minWidth: 360,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 10,
  },
  taskItemContent: {
    color: "black",
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  textinputTitleRight: {
    flex: 1,
    justifyContent: "center",
    alignContent: "flex-end",
    marginLeft: 15,
    marginTop: 0,
    marginRight: 15,
    marginBottom: 0,
    backgroundColor: "#ffffff",
    maxHeight: 60,
    minWidth: 360,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 10,
  },
  titleContent: {
    color: "black",
    fontSize: 20,
    marginLeft: 10,
  },
});
