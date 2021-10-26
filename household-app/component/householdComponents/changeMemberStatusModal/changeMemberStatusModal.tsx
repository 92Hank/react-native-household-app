import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { RadioButton } from "react-native-paper";
import RadioForm from "react-native-simple-radio-button";
import { snackbarContext } from "../../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import {
    useAcceptUserMutation,
    useMakeUserToOwnerMutation,
    usePauseUserMutation,
} from "../../../Redux/Service/household/householdApi";

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
    if (!user) return <view></view>;

    const [makeOwner, setMakeOwner] = useState<number>(0);
    const [paused, setPaused] = useState<number>(0);
    const [unPaused, setUnPaused] = useState<number>(0);
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [acceptUser, setAcceptUser] = useState<number>(0);
    // const [message, setMessage] = useState<string>("");
    // const [openSnackbar, setOpenSnackbar] = useState<boolean>();
    const { setSnackbar } = useContext(snackbarContext);

    const [makeUserToOwner, { error: makeToOwnerError, isSuccess: isMakeOwnerSuccess }] = useMakeUserToOwnerMutation();
    const [pauseUser, { error: pauseUserError, isSuccess: isPasuedSuccess }] = usePauseUserMutation();
    const [acceptUserApi, { error: acceptError, isSuccess: isAcceptSuccess }] = useAcceptUserMutation();

    useEffect(() => {
        if (isAcceptSuccess) {
            setSnackbar("Förfrågan accepterad", true);
            props.handleModalClose();
        }
    }, [isAcceptSuccess]);

    useEffect(() => {
        if (isPasuedSuccess) {
            setSnackbar("Pausad status ändrad på medlem", true);
            props.handleModalClose();
        }
    }, [isPasuedSuccess]);

    useEffect(() => {
        if (isMakeOwnerSuccess) {
            setSnackbar("Medlem har blivit en ägare", true);
            props.handleModalClose();
        }
    }, [isMakeOwnerSuccess]);

    useEffect(() => {
        if (makeToOwnerError) {
            setSnackbar("Ett oväntat fel dök upp", true);
            console.log("error", makeToOwnerError);
        }
    }, [makeToOwnerError]);

    useEffect(() => {
        if (pauseUserError) {
            setSnackbar("Ett oväntat fel dök upp", true);
            console.log("error", pauseUserError);
        }
    }, [pauseUserError]);

    useEffect(() => {
        if (acceptError) {
            setSnackbar("Ett oväntat fel dök upp", true);
            console.log("error", acceptError);
        }
    }, [acceptError]);

    const onSave = () => {
        if (!currentHousehold) return;

        const { userId, isOwner, isPaused, AcceptedStatus } = props.member;

        let rights = false;
        if (currentHousehold?.member.find((m) => m.userId === user.id && m.isOwner)) {
            rights = true;
        }

        // console.log()
        if (!rights) {
            // eslint-disable-next-line no-alert
            // setMessage("Du har ej rättigheter att ändra status");
            setSnackbar("Du har ej rättigheter att ändra status", true);
            // setOpenSnackbar(true);
            // alert("Du har ej rättigheter att ändra status");
            // snackbar in future!
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            props.handleModalClose();
            return;
        }
        if (makeOwner === 1 && paused === 1) {
            // eslint-disable-next-line no-alert
            // alert("kan ej både pausa och göra till ägare!");
            // setMessage("kan ej både pausa och göra till ägare!");
            // setOpenSnackbar(true);
            setSnackbar("kan ej både pausa och göra till ägare!", true);

            console.log("snack");
            // snackbar in future!
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            props.handleModalClose();
            return;
        }
        if (makeOwner === 1 && isOwner === false) {
            makeUserToOwner({ houseHoldId: currentHousehold.id, userId: userId });
            // console.log("får kolla hur vi kan använda response från redux för att ge feedback");
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            props.handleModalClose();
            return;
            // api mot att göra till owner
        }
        if (paused === 1 && isPaused === false) {
            // Make som changes here
            pauseUser({ houseHoldId: currentHousehold.id, userId: userId, isPaused: true });
            console.log("set on pause api");
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            props.handleModalClose();
            return;
        }
        if (unPaused === 1 && isPaused === true) {
            console.log("unPause member api");
            pauseUser({ houseHoldId: currentHousehold.id, userId: userId, isPaused: false });

            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            props.handleModalClose();
            return;
            // api mot att göra till owner
        }
        if (acceptUser === 1 && AcceptedStatus === "pending") {
            console.log("acceptUserApi");
            acceptUserApi({ houseHoldId: currentHousehold.id, userId: userId });
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            props.handleModalClose();
            return;
        }
        if (acceptUser === 0 && AcceptedStatus === "pending") {
            console.log("reject remove user");

            //[TODO:Redux]reject user
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            props.handleModalClose();
            return;
        }
    };

    return (
        <View>
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
                                {props.member.AcceptedStatus === "accepted" && (
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
                                            radio_props={radioPropsUnPause}
                                            initial={1}
                                            onPress={(value: number) => {
                                                setUnPaused(value as number);
                                            }}
                                        />
                                    </View>
                                )}
                                {props.member.AcceptedStatus === "pending" && (
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
