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
import { LocalIp, webUrl } from "../../../Redux/Config";
import household, {
  householdJoin,
} from "../../../Redux/entity/householdRequestType";

interface Props {
  isOpen: boolean;
  handleModalClose: () => void;
}

// GÖR DOM STÖRRE
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

export default function JoinHouseholdModal(props: Props) {
  const [code, setCode] = useState<string>();
  const onChangeInput = (code: string) => setCode(code);
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [avatar, setAvatar] = useState<string>();
  const [avatarIndex, setAvatarIndex] = useState<number>();
  const [household, setHousehold] = useState<household>();
  const [emojis, setAvatars] = useState<string[]>();

  let avatars = Object.keys(Avatars).filter((key) => !isNaN(Number(key)));
  let existingAvatars: Avatars[] = [];

  const avatarSelect = (index: number) => {
    setAvatarIndex(index);
    let selectedAvatar = Avatars[index];
    setAvatar(selectedAvatar);
  };

  const onSubmit = async () => {
    if (code) {
      const rawResponse = await fetch(
        `${webUrl}/household/invitecode/${code}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json,text/plain",
            "Content-Type": "application/json",
          },
        }
      );
      if (rawResponse.status === 200) {
        setCodeSubmitted(true);

        const foundHousehold: household = await rawResponse.json();
        foundHousehold.member.forEach((element) => {
          existingAvatars.push(element.emoji);
        });
        avatars = avatars.filter(
          (val) => !existingAvatars.includes(Number(val))
        );
        setAvatars(avatars);

        setHousehold(foundHousehold);
      } else {
        alert("Inget hushåll hittat");
      }
    } else {
      alert("APAPAP! Du måste ange en kod");
    }
  };

  function onApply(): void {
    alert("Ansöker");
    console.log(avatarIndex);
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
                  onPress={() => onSubmit()}
                  style={styles.saveButton}
                >
                  <MaterialIcons
                    name="add-circle-outline"
                    size={30}
                    color="black"
                  />
                  <Text style={styles.buttonText}>Sök</Text>
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
            <View style={styles.modalRequestView}>
              <Text style={styles.modalText}>{code}</Text>
              <Text style={styles.modalText}>{household?.name}</Text>
              <Text style={styles.modalText}>{household?.ownerId}</Text>
              <Text style={styles.modalText}> Välj en medlemsavatar:</Text>
              <View style={styles.avatars}>
                {emojis?.map(function (name, index) {
                  return (
                    <TouchableOpacity
                      onPress={() => avatarSelect(Number(name))}
                      key={index}
                    >
                      <Text style={styles.avatar}>{Avatars[Number(name)]}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View>
                <Text style={{ marginTop: 40, fontSize: 20 }}>
                  Vald avatar:
                  {avatar && <Text style={styles.avatar}> {avatar} </Text>}
                </Text>
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
                  onPress={() => {
                    props.handleModalClose();
                    setCodeSubmitted(false);
                    setCode("");
                  }}
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
  avatars: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    fontSize: 26,
    // marginTop: "50%",
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
  modalRequestView: {
    width: 300,
    height: 500,
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
