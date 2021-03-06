import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Surface, Text, useTheme } from "react-native-paper";
import RadioForm from "react-native-simple-radio-button";
import { snackbarContext } from "../../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import {
    useAcceptUserMutation,
    useMakeUserToOwnerMutation,
    usePauseUserMutation,
    useRejectUserMutation,
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
    { label: "Acceptera", value: 1 },
    { label: "Avvisa", value: 0 },
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
    const [makeOwner, setMakeOwner] = useState<number>(0);
    const [paused, setPaused] = useState<number>(0);
    const [unPaused, setUnPaused] = useState<number>(0);
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [acceptUser, setAcceptUser] = useState<number>(0);
    const { setSnackbar } = useContext(snackbarContext);

    const [makeUserToOwner, { error: makeToOwnerError, isSuccess: isMakeOwnerSuccess }] = useMakeUserToOwnerMutation();
    const [pauseUser, { error: pauseUserError, isSuccess: isPasuedSuccess }] = usePauseUserMutation();
    const [acceptUserApi, { error: acceptError, isSuccess: isAcceptSuccess }] = useAcceptUserMutation();
    const [rejectUser, { error: rejectError, isSuccess: rejectSuccess }] = useRejectUserMutation();
    const user = useAppSelector(selectCurrentLoginUser);
    const { colors } = useTheme();

    useEffect(() => {
        if (rejectError) {
            setSnackbar("Ett ov??ntat fel d??k upp", true);
            props.handleModalClose();
        }
    }, [rejectError]);

    useEffect(() => {
        if (rejectSuccess) {
            setSnackbar("Anv??ndare avvisad", true);
            props.handleModalClose();
        }
    }, [rejectSuccess]);

    useEffect(() => {
        if (isAcceptSuccess) {
            setSnackbar("F??rfr??gan accepterad", true);
            props.handleModalClose();
        }
    }, [isAcceptSuccess]);

    useEffect(() => {
        if (isPasuedSuccess) {
            setSnackbar("Pausad status ??ndrad p?? medlem", true);
            props.handleModalClose();
        }
    }, [isPasuedSuccess]);

    useEffect(() => {
        if (isMakeOwnerSuccess) {
            setSnackbar("Medlem har blivit en ??gare", true);
            props.handleModalClose();
        }
    }, [isMakeOwnerSuccess]);

    useEffect(() => {
        if (makeToOwnerError) {
            setSnackbar("Ett ov??ntat fel d??k upp", true);
            console.log("error", makeToOwnerError);
        }
    }, [makeToOwnerError]);

    useEffect(() => {
        if (pauseUserError) {
            setSnackbar("Ett ov??ntat fel d??k upp", true);
            console.log("error", pauseUserError);
        }
    }, [pauseUserError]);

    useEffect(() => {
        if (acceptError) {
            setSnackbar("Ett ov??ntat fel d??k upp", true);
            console.log("error", acceptError);
        }
    }, [acceptError]);

    if (!user) return <view></view>;

    const onSave = () => {
        if (!currentHousehold) return;

        const { userId, isOwner, isPaused, AcceptedStatus } = props.member;

        if (makeOwner === 1 && paused === 1) {
            setSnackbar("kan ej b??de pausa och g??ra till ??gare!", true);
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
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            props.handleModalClose();
            return;
        }
        if (paused === 1 && isPaused === false) {
            pauseUser({ houseHoldId: currentHousehold.id, userId: userId, isPaused: true });
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            props.handleModalClose();
            return;
        }
        if (unPaused === 1 && isPaused === true) {
            pauseUser({ houseHoldId: currentHousehold.id, userId: userId, isPaused: false });
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            props.handleModalClose();
            return;
        }
        if (acceptUser === 1 && AcceptedStatus === "pending") {
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
            rejectUser({ houseHoldId: currentHousehold.id, userId: userId });
            setMakeOwner(0);
            setPaused(0);
            setPaused(0);
            setUnPaused(0);
            setAcceptUser(0);
            props.handleModalClose();
            return;
        }
        props.handleModalClose();
        setSnackbar("Inget f??r??ndrades", true);
        setMakeOwner(0);
        setPaused(0);
        setPaused(0);
        setUnPaused(0);
        setAcceptUser(0);
    };

    const close = () => {
        setMakeOwner(0);
        setPaused(0);
        setPaused(0);
        setUnPaused(0);
        setAcceptUser(0);
        props.handleModalClose();
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
                        <Surface style={[props.isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                            <Surface style={{ ...styles.modalView, backgroundColor: colors.contrastColor }}>
                                <Surface style={{ ...styles.modalTextView, backgroundColor: colors.blackWhiteToggle }}>
                                    <Text style={styles.modalText}>{"Namn: " + props.member.name}</Text>
                                </Surface>
                                {props.member.AcceptedStatus === "accepted" && (
                                    <View
                                        style={{
                                            position: "absolute",
                                            justifyContent: "center",
                                            alignItems: "flex-start",
                                            marginTop: 90,
                                        }}
                                    >
                                        {props.member.isOwner === false && props.member.isPaused === false && (
                                            <View style={styles.container}>
                                                <View style={styles.row}>
                                                    <Text style={styles.modalText}>G??r till ??gare:</Text>

                                                    <RadioForm
                                                        radio_props={radioPropsOwner}
                                                        initial={-1}
                                                        onPress={(value: number) => {
                                                            setMakeOwner(value as number);
                                                        }}
                                                    />
                                                </View>
                                                <Divider
                                                    style={{
                                                        borderColor: "black",
                                                        borderBottomWidth: 2,
                                                        marginTop: 10,
                                                        marginBottom: 10,
                                                    }}
                                                />
                                                <View style={styles.row}>
                                                    <Text style={styles.modalText}>Pausa anv??ndare:</Text>
                                                    <RadioForm
                                                        radio_props={radioPropsPause}
                                                        initial={-1}
                                                        onPress={(value: number) => {
                                                            setPaused(value as number);
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                )}
                                {props.member.isPaused === true && (
                                    <View
                                        style={{
                                            position: "absolute",
                                            justifyContent: "center",
                                            alignItems: "flex-start",
                                            marginTop: 130,
                                        }}
                                    >
                                        <View style={styles.container}>
                                            <View style={styles.row}>
                                                <Text style={styles.modalText}>Aktivera anv??ndare:</Text>
                                                <RadioForm
                                                    radio_props={radioPropsUnPause}
                                                    initial={-1}
                                                    onPress={(value: number) => {
                                                        setUnPaused(value as number);
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                )}
                                {props.member.AcceptedStatus === "pending" && (
                                    <View
                                        style={{
                                            position: "absolute",
                                            justifyContent: "center",
                                            alignItems: "flex-start",
                                            marginTop: 110,
                                        }}
                                    >
                                        <View style={styles.container}>
                                            <Text style={styles.modalText}>Ans??ker om att g?? med</Text>
                                            <View style={styles.pendingRow}>
                                                <RadioForm
                                                    formHorizontal={true}
                                                    initial={-1}
                                                    labelStyle={{ marginRight: 10 }}
                                                    radio_props={radioPropsAccept}
                                                    onPress={(value: number) => {
                                                        setAcceptUser(value as number);
                                                    }}
                                                ></RadioForm>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        onPress={() => onSave()}
                                        style={{ ...styles.saveButton, backgroundColor: colors.blackWhiteToggle }}
                                    >
                                        <MaterialIcons
                                            name="add-circle-outline"
                                            size={30}
                                            color={colors.whiteBlackToggle}
                                        />
                                        <Text style={styles.buttonText}>Spara</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={close}
                                        style={{ ...styles.closeButton, backgroundColor: colors.blackWhiteToggle }}
                                    >
                                        <MaterialCommunityIcons
                                            name="close-circle-outline"
                                            size={30}
                                            color={colors.whiteBlackToggle}
                                        />
                                        <Text style={styles.buttonText}>St??ng</Text>
                                    </TouchableOpacity>
                                </View>
                            </Surface>
                        </Surface>
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
    container: {
        minWidth: "100%",
    },
    input: {
        width: "100%",
        marginBottom: 15,
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    pendingRow: {
        marginTop: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
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
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        width: 300,
        height: 340,
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
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
    modalTextView: {
        alignItems: "flex-start",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        minWidth: "100%",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "white",
    },
});
