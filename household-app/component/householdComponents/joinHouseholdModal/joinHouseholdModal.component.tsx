import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import household from "../../../../Common/household";

interface Props {
  isOpen: boolean;
  handleModalClose: () => void;
}

export default function JoinHouseholdModal(props: Props) {
  const [code, setCode] = useState<string>();
  const onChangeInput = (code: string) => setCode(code);
  const [codeSubmitted, setCodeSubmitted] = useState(false);

  // Ersätt med data från db
  const household: household = {
    name: "Stugan",
  };

  enum Avatars {
    "🦊" = 1,
    "🐷" = 2,
    "🐸" = 3,
    "🐥" = 4,
    "🐙" = 5,
    "🐬" = 6,
    "🦉" = 7,
    "🦄" = 8,
  }

  interface avatar {
    avatar: string;
  }

  const keys = Object.keys(Avatars).filter((key) => isNaN(Number(key)));

  const avatars = [];
  avatars.push(keys);

  const onSave = () => {
    if (code) {
      setCodeSubmitted(true);
    } else {
      alert("APAPAP! Du måste ange en kod");
    }
  };

  function onApply(): void {
    alert("Ansöker");
  }

  return (
    <View style={styles.centeredView}>
      {!codeSubmitted ? (
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
      ) : (
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
              <Text style={styles.modalText}>{code}</Text>
              <Text style={styles.modalText}>{household.name}</Text>
              {/* <TextInput
                theme={{ roundness: 10 }}
                outlineColor="white"
                mode="outlined"
                style={styles.input}
                value={code}
                label="Hushållskod"
                onChangeText={onChangeInput}
              /> */}

              <View>
                {/* <Text>Välj en avatar: </Text>
                <Text style = {styles.avatars}>{keys}</Text> */}
                {avatars.map(function (name, index) {
                  return <Text key={index}>{name}</Text>;
                })}
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() => onApply()}
                  style={styles.saveButton}
                >
                  <MaterialIcons
                    name="add-circle-outline"
                    size={30}
                    color="black"
                  />
                  <Text style={styles.buttonText}>Ansök</Text>
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
                  <Text style={styles.buttonText}>Avbryt</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: "space-around",
  },
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
