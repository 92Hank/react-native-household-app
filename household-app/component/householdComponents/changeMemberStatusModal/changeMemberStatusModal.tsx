import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { FeedStackScreenProps, MainRoutes } from "../../../routes/routes";
// import { RadioButton } from "react-native-paper";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import household from "../../../Redux/entity/household";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";

const radioPropsOwner = [
    { label: "Ja", value: 1 },
    { label: "Nej", value: 0 },
];

const radioPropsPause = [
    { label: "Ja", value: 1 },
    { label: "Nej", value: 0 },
];

const radioPropsAccept = [
    { label: "Ja", value: 1 },
    { label: "Nej", value: 0 },
];

const radioPropsUnPause = [
    { label: "Ja", value: 1 },
    { label: "Nej", value: 0 },
];

interface Props {
    isOpen: boolean;
    handleModalClose: () => void;
    member: fullMemberInfo;
}

function ChangeMemberStatusModal(props: Props) {
    // const [name, setName] = useState<string>();
    const user = useAppSelector(selectCurrentLoginUser);
    const [makeOwner, setMakeOwner] = useState<number>(0);
    const [paused, setPaused] = useState<number>(0);
    const [unPaused, setUnPaused] = useState<number>(0);
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [acceptUser, setAcceptUser] = useState<number>(0);

    const onSave = () => {
        let rights = false;
        currentHousehold?.member.forEach((m) => {
            if (m.userId === user?.id && m.isOwner) {
                rights = true;
            }
        });
        // console.log()
        if (!rights) {
            alert("Du har ej rättigheter att ändra status");
            // snackbar in future!
            setMakeOwner(0);
            setPaused(0);
        }
        if (makeOwner === 1 && paused === 1) {
            alert("kan ej både pausa och göra till ägare!");
            // snackbar in future!
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            return;
        }
        if (makeOwner === 1 && props.member.isOwner === false) {
            console.log("make owner api");
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            return;
            // api mot att göra till owner
        }
        if (paused === 1 && props.member.isPaused === false) {
            // Make som changes here
            console.log("set on pause api");
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            return;
        }
        if (unPaused === 1 && props.member.isPaused === true) {
            console.log("unPause member api");
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            return;
            // api mot att göra till owner
        }
        if (acceptUser === 1 && props.member.AcceptedStatus === "pending") {
            console.log("acceptUserApi");
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            return;
        }
        if (acceptUser === 0 && props.member.AcceptedStatus === "pending") {
            console.log("reject remove user");
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            return;
        }
    };

    return (
        <View style={styles.centeredView}>
            {props.member && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.isOpen}
                    onRequestClose={() => {
                        props.isOpen;
                    }}
                >
                    <View style={[props.isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Namn:
                                <Text style={styles.modalText}>{" " + props.member.name}</Text>
                            </Text>
                            {props.member.AcceptedStatus == "accepted" && (
                                <View>
                                    {props.member.isOwner === false && props.member.isPaused === false && (
                                        <View>
                                            <Text style={styles.modalText}>Gör till ägare:</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <RadioForm
                                                    radio_props={radioPropsOwner}
                                                    initial={1}
                                                    onPress={(value: number) => {
                                                        setMakeOwner(value as number);
                                                    }}
                                                />
                                            </View>
                                            <Text style={styles.modalText}>Pausa användare:</Text>
                                            <RadioForm
                                                radio_props={radioPropsPause}
                                                initial={1}
                                                onPress={(value: number) => {
                                                    setPaused(value as number);
                                                }}
                                            />
                                        </View>
                                    )}
                                </View>
                            )}
                            {props.member.isPaused === true && (
                                <View>
                                    <Text style={styles.modalText}>Aktivera pausad användare:</Text>
                                    <RadioForm
                                        radio_props={radioPropsPause}
                                        initial={1}
                                        onPress={(value: number) => {
                                            setUnPaused(value as number);
                                        }}
                                    />
                                </View>
                            )}
                            {props.member.AcceptedStatus == "pending" && (
                                <View>
                                    <Text style={styles.modalText}>Ansöker om att gå med</Text>
                                    <RadioForm
                                        radio_props={radioPropsAccept}
                                        initial={1}
                                        onPress={(value: number) => {
                                            setAcceptUser(value as number);
                                        }}
                                    />
                                </View>
                            )}
                            {props.member.isOwner === true && (
                                <View>
                                    <Text style={styles.modalText}>En av ägarna i hushållet</Text>
                                </View>
                            )}
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => onSave()} style={styles.saveButton}>
                                    <MaterialIcons name="add-circle-outline" size={30} color="black" />
                                    <Text style={styles.buttonText}>Spara</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={props.handleModalClose} style={styles.closeButton}>
                                    <MaterialCommunityIcons name="close-circle-outline" size={30} color="black" />
                                    <Text style={styles.buttonText}>Stäng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

export default ChangeMemberStatusModal;

interface fullMemberInfo {
    name: string;
    userId: string;
    emoji: number;
    isPaused: boolean;
    isOwner: boolean;
    AcceptedStatus: "accepted" | "pending" | "rejected";
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#ffff",
        width: "100%",
        marginBottom: 15,
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
