import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  isOpen: boolean;
  handleModalClose: () => void;
}

export default function JoinHouseholdModal(props: Props) {
  const [code, setCode] = useState<string>();
  const onChangeInput = (code: string) => setCode(code);
  const onSave = () => {
    if (code) {
      alert(code);
    } else {
      alert("APAPAP! Du måste ange en kod");
    }
  };

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
            <Text style={styles.modalText}>Ange hushållskod: </Text>
            <TextInput
              theme={{ roundness: 10 }}
              outlineColor="white"
              mode="outlined"
              style={styles.input}
              value={code}
              label="Hushållskod"
              onChangeText={onChangeInput}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => onSave()}
                style={styles.saveButton}
              >
                <MaterialIcons
                  name="add-circle-outline"
                  size={30}
                  color="black"
                />
                <Text style={styles.buttonText}>Gå med</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={props.handleModalClose}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={30}
                  color="black"
                />
                <Text style={styles.buttonText}>Stäng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffff",
    width: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  centeredViewBlurred: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    // margin: 20,
    width: 300,
    height: 300,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 20,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "50%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    borderBottomRightRadius: 20,
    borderStartWidth: 1,
    borderStartColor: "gainsboro",
  },
  saveButton: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "50%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    borderBottomLeftRadius: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
});
