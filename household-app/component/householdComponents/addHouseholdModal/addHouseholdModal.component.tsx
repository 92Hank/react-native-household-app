import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, TextInput, Text, useTheme } from "react-native-paper";
import { householdCreate } from "../../../../Common/household";
import { snackbarContext } from "../../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { useCreateHouseholdMutation } from "../../../Redux/Service/household/householdApi";
import { FeedStackScreenProps, MainRoutes } from "../../../routes/routes";
import SnackbarComponent from "../../snackbar/snackbarComponent";
import * as Yup from "yup";

interface DefaultProps {
    isOpen: boolean;
    handleModalClose: () => void;
}

type NavProps = FeedStackScreenProps<MainRoutes.HouseholdScreen>;

type Props = DefaultProps & NavProps;

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

enum Avatars {
    "🦊" = "1",
    "🐷" = "2",
    "🐸" = "3",
    "🐥" = "4",
    "🐙" = "5",
    "🐬" = "6",
    "🦉" = "7",
    "🦄" = "8",
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddHouseholdModal: FC<Props> = (props: Props): React.ReactElement => {
    const [name, setName] = useState<string>();
    const onChangeInput = (name: string) => setName(name);
    const user = useAppSelector(selectCurrentLoginUser);
    const [avatar, setAvatar] = useState<string>();
    const avatars = Object.keys(Avatars).filter((key) => isNaN(Number(key)));
    const { setSnackbar, isVisible, message } = useContext(snackbarContext);
    const { colors } = useTheme();

    const [CreateHousehold, { status, isSuccess, error, isLoading }] = useCreateHouseholdMutation();

    const defaultName: inputHousehold = {
        name: "",
    };

    useEffect(() => {
        console.log("isSuccess", isSuccess);
        if (isSuccess) {
            setSnackbar("Lyckades att skapa hushåll", true);
            props.handleModalClose();
        }
    }, [isSuccess]);

    useEffect(() => {
        console.log("isCreating", isLoading);
    }, [isLoading]);

    useEffect(() => {
        console.log("status", status);
    }, [status]);

    useEffect(() => {
        if (error) {
            setSnackbar("Ett oväntat fel dök upp", true);
            console.log("error", error);
        }
    }, [error]);

    if (!user) {
        props.navigation.navigate(MainRoutes.LoginScreen);
        return <View></View>;
    }

    const avatarSelect = (index: number) => {
        setAvatar(index.toString());
        console.log(index);
    };

    const onSave = async (household: inputHousehold) => {
        if (household.name && avatar) {
            const requestData: householdCreate = {
                name: household.name,
                ownerId: user.id!,
                member: {
                    name: user.userName,
                    userId: user.id!,
                    emoji: Number(avatar),
                },
            };
            CreateHousehold(requestData);
        } else {
            setSnackbar("Måste välja namn och en avatar", true);
        }
    };

    return (
        <View style={styles.centeredView}>
            <Formik
                validationSchema={validationSchema}
                initialValues={defaultName}
                onSubmit={onSave}
                validateOnChange={false}
            >
                {({ errors, values, handleChange, handleSubmit, touched }) => (
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
                                <SnackbarComponent isVisible={isVisible} message={message} />
                                <ScrollView>
                                    <Text style={styles.modalText}>Namnge hushåll: </Text>
                                    <TextInput
                                        theme={{ roundness: 10 }}
                                        outlineColor="white"
                                        mode="outlined"
                                        style={{ ...styles.input, backgroundColor: colors.inputColor }}
                                        value={values.name}
                                        label="Namn på hushållet"
                                        onChangeText={handleChange<keyof inputHousehold>("name")}
                                        textAlign={undefined}
                                    />
                                    {errors.name && touched.name && (
                                        <Text style={{ fontSize: 10, color: "red" }}>{errors.name}</Text>
                                    )}
                                    <View style={{ marginTop: 25 }}>
                                        <Text style={styles.modalText}> Välj en medlemsavatar:</Text>
                                        <View style={styles.avatars}>
                                            {avatars.map(function (name, index) {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => avatarSelect(Number(index + 1))}
                                                        key={index}
                                                    >
                                                        <Text style={styles.avatar}>{name}</Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        {avatar && (
                                            <Text style={{ marginTop: 40, fontSize: 20 }}>
                                                Vald avatar:
                                                <Text style={styles.avatar}> {avatars[Number(avatar) - 1]} </Text>
                                            </Text>
                                        )}
                                    </View>
                                </ScrollView>
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        onPress={handleSubmit}
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
                                        onPress={props.handleModalClose}
                                        style={{ ...styles.closeButton, backgroundColor: colors.blackWhiteToggle }}
                                    >
                                        <MaterialCommunityIcons
                                            name="close-circle-outline"
                                            size={30}
                                            color={colors.whiteBlackToggle}
                                        />
                                        <Text style={styles.buttonText}>Stäng</Text>
                                    </TouchableOpacity>
                                </View>
                            </Surface>
                        </Surface>
                    </Modal>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    avatarPressed: {
        // backgroundColor: "green",
    },
    avatar: {
        fontSize: 45,
        margin: 10,
        flexWrap: "wrap",
    },
    avatars: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    input: {
        // backgroundColor: "#ffff",
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
        height: windowHeight,
        // marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        // margin: 20,
        width: windowWidth - 20,
        height: "85%",
        // backgroundColor: "#f2f2f2",
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
        // color: "white",
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
        // backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "50%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        // shadowColor: "rgba(0, 0, 0, 0.1)",
        // shadowOpacity: 0.8,
        // elevation: 3,
        // shadowRadius: 15,
        // shadowOffset: { width: 1, height: 13 },
        borderBottomRightRadius: 20,
        borderStartWidth: 1,
        borderStartColor: "gainsboro",
    },
    saveButton: {
        // backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "50%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        // shadowColor: "rgba(0, 0, 0, 0.1)",
        // shadowOpacity: 0.8,
        // elevation: 6,
        // shadowRadius: 15,
        // shadowOffset: { width: 1, height: 13 },
        borderBottomLeftRadius: 20,
    },
    buttonText: {
        // color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
});

export default AddHouseholdModal;
