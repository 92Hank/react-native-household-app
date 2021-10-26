/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { useChangeNameMutation } from "../../../Redux/Service/household/householdApi";
import { snackbarContext } from "../../../context/snackBarContext";

interface Props {
    isOpen: boolean;
    handleModalClose: () => void;
}

function ChangeHouseholdNameModal(props: Props) {
    const user = useAppSelector(selectCurrentLoginUser);
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [rights, setRights] = useState(false);
    const [name, setName] = useState<string>(currentHousehold?.name!);
    const [changeHouseholdName, { isSuccess, error }] = useChangeNameMutation();
    const { setSnackbar } = useContext(snackbarContext);

    useEffect(() => {
        currentHousehold?.member.forEach((m) => {
            if (m.userId === user?.id && m.isOwner) {
                setRights(true);
            }
        });
    }, [rights]);

    useEffect(() => {
        if (isSuccess) {
            setSnackbar("Nytt husshållsnamn: " + name, true);
            props.handleModalClose();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            setSnackbar("Ett oväntat fel dök upp", true);
        }
    }, [error]);

    const onChangeTextName = (name: string) => setName(name);

    const handleChangeName = () => {
        if (name.length < 3) {
            setSnackbar("Du måste ha ett namn på minst 3 karaktärer", true);
            return;
        }
        console.log("apiCall");
        changeHouseholdName({ houseHoldId: currentHousehold?.id as string, name: name });
    };

    return (
        <View style={styles.centeredView}>
            {props.isOpen && (
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
                            <Text style={styles.modalText}>Byt hushållsnamn</Text>
                            <TextInput style={styles.input} onChangeText={onChangeTextName} value={name} />
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={handleChangeName} style={styles.saveButton}>
                                    <MaterialIcons name="delete-forever" size={30} color="black" />
                                    <Text style={styles.buttonText}>Ja</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={props.handleModalClose} style={styles.closeButton}>
                                    <MaterialCommunityIcons name="arrow-left-bold" size={30} color="black" />
                                    <Text style={styles.buttonText}>Nej</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

export default ChangeHouseholdNameModal;

const styles = StyleSheet.create({
    input: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    householdButton: {
        marginTop: 20,
        margin: 5,
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 100,
        width: 140,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    householdButtonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
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
        width: 300,
        height: 200,
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
    warningText: {
        fontWeight: "bold",
        textAlign: "center",
        color: "red",
    },
});
