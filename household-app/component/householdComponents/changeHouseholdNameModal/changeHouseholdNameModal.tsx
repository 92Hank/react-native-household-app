/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text, TextInput, useTheme } from "react-native-paper";
import * as Yup from "yup";
import { householdChangeName } from "../../../../Common/household";
import { snackbarContext } from "../../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { useChangeNameMutation } from "../../../Redux/Service/household/householdApi";

interface Props {
    isOpen: boolean;
    handleModalClose: () => void;
}

interface inputHousehold {
    name: string;
}

type PostSchemaType = Record<keyof inputHousehold, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
    name: Yup.string()
        .min(3, ({ min }) => `minst ${min} bokstäver!`)
        .max(20, ({ max }) => `max ${max} bokstäver!`)
        .required("Namn måste fyllas i!"),
});

function ChangeHouseholdNameModal(props: Props) {
    const user = useAppSelector(selectCurrentLoginUser);
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [rights, setRights] = useState(false);
    const [name, setName] = useState<string>(currentHousehold?.name!);
    const [changeHouseholdName, { isSuccess, error }] = useChangeNameMutation();
    const { setSnackbar } = useContext(snackbarContext);
    const { colors } = useTheme();

    const defaultTask: householdChangeName = {
        name: currentHousehold?.name as string,
        houseHoldId: currentHousehold?.id as string,
    };

    useEffect(() => {
        currentHousehold?.member.forEach((m) => {
            if (m.userId === user?.id && m.isOwner) {
                setRights(true);
            }
        });
    }, [rights]);

    useEffect(() => {
        if (isSuccess) {
            setSnackbar("Nytt hushållsnamn: " + name, true);
            props.handleModalClose();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            setSnackbar("Ett oväntat fel dök upp", true);
        }
    }, [error]);

    const onChangeTextName = (name: string) => setName(name);

    const handleChangeName = (household: inputHousehold) => {
        if (household.name) {
            setName(household.name);
            changeHouseholdName({ houseHoldId: currentHousehold?.id as string, name: household.name });
        } else {
            setSnackbar("Du måste ha ett namn på minst 3 karaktärer", true);
        }
    };

    return (
        <View style={styles.centeredView}>
            {props.isOpen && (
                <Formik
                    validationSchema={validationSchema}
                    initialValues={defaultTask}
                    onSubmit={handleChangeName}
                    validateOnChange={false}
                >
                    {({ errors, handleChange, handleSubmit, touched }) => (
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
                                    <Text style={styles.modalText}>Byt hushållsnamn</Text>
                                    <TextInput
                                        defaultValue={name}
                                        style={{ ...styles.input, backgroundColor: colors.inputColor }}
                                        onChangeText={handleChange<keyof inputHousehold>("name")}
                                        textAlign={undefined}
                                    />
                                    {errors.name && touched.name && (
                                        <Text style={{ fontSize: 10, color: "red" }}>{errors.name}</Text>
                                    )}
                                    <View style={styles.buttonsContainer}>
                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={{ ...styles.saveButton, backgroundColor: colors.blackWhiteToggle }}
                                        >
                                            <MaterialIcons name="save" size={30} color={colors.whiteBlackToggle} />
                                            <Text style={styles.buttonText}>Ja</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={props.handleModalClose}
                                            style={{ ...styles.closeButton, backgroundColor: colors.blackWhiteToggle }}
                                        >
                                            <MaterialCommunityIcons
                                                name="arrow-left-bold"
                                                size={30}
                                                color={colors.whiteBlackToggle}
                                            />
                                            <Text style={styles.buttonText}>Nej</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Surface>
                            </Surface>
                        </Modal>
                    )}
                </Formik>
            )}
        </View>
    );
}

export default ChangeHouseholdNameModal;

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        padding: 10,
    },
    householdButton: {
        marginTop: 20,
        margin: 5,
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
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        width: 300,
        height: 230,
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
    warningText: {
        fontWeight: "bold",
        textAlign: "center",
        color: "red",
    },
});
