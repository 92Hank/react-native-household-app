import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { FC, useContext, useEffect, useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { webUrl } from "../../../Redux/Config";
import { household, householdJoin } from "../../../../Common/household";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { useJoinHouseholdMutation } from "../../../Redux/Service/household/householdApi";
import { FeedStackScreenProps, MainRoutes } from "../../../routes/routes";
import { snackbarContext } from "../../../context/snackBarContext";

interface DefaultProps {
    isOpen: boolean;
    handleModalClose: () => void;
}

type NavProps = FeedStackScreenProps<MainRoutes.HouseholdScreen>;

type Props = DefaultProps & NavProps;

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
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const JoinHouseholdModal: FC<Props> = (props: Props): React.ReactElement => {
    const [code, setCode] = useState<string>();
    const onChangeInput = (code: string) => setCode(code);
    const [codeSubmitted, setCodeSubmitted] = useState(false);
    const [avatar, setAvatar] = useState<string>();
    const [avatarIndex, setAvatarIndex] = useState<number>();
    const [household, setHousehold] = useState<household>();
    const [emojis, setAvatars] = useState<string[]>();
    const { setSnackbar } = useContext(snackbarContext);

    const user = useAppSelector(selectCurrentLoginUser);

    if (!user) {
        props.navigation.navigate(MainRoutes.LoginScreen);
        return <View></View>;
    }

    let avatars = Object.keys(Avatars).filter((key) => !isNaN(Number(key)));
    const existingAvatars: Avatars[] = [];

    const [
        JoinHousehold, // This is the mutation trigger

        { status, isSuccess, error, isLoading }, // This is the destructured mutation result
    ] = useJoinHouseholdMutation();

    useEffect(() => {
        console.log("isSuccess", isSuccess);
        if (isSuccess) {
            setSnackbar("Ansökan om att gå med i hushåll skickad", true);
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

    const avatarSelect = (index: number) => {
        setAvatarIndex(index);
        const selectedAvatar = Avatars[index];
        setAvatar(selectedAvatar);
    };

    const onSubmit = async () => {
        if (code) {
            const rawResponse = await fetch(`${webUrl}/household/invitecode/${code}`, {
                method: "GET",
                headers: {
                    Accept: "application/json,text/plain",
                    "Content-Type": "application/json",
                },
            });
            if (rawResponse.status === 200) {
                setCodeSubmitted(true);

                const foundHousehold: household = await rawResponse.json();
                console.log(foundHousehold);
                foundHousehold.member.forEach((element) => {
                    existingAvatars.push(element.emoji);
                    // console.log(foundHousehold);
                });
                avatars = avatars.filter((val) => !existingAvatars.includes(Number(val)));
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
        if (household && avatarIndex && user) {
            const requestData: householdJoin = {
                houseHoldId: household.id,
                inviteCode: Number(code),
                member: {
                    userId: user.id!,
                    emoji: avatarIndex,
                    name: user.userName,
                },
            };
            console.log(requestData);
            JoinHousehold(requestData);
        }
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
                    <View style={[props.isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
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
                                <TouchableOpacity onPress={() => onSubmit()} style={styles.saveButton}>
                                    <MaterialIcons name="add-circle-outline" size={30} color="black" />
                                    <Text style={styles.buttonText}>Sök</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={props.handleModalClose} style={styles.closeButton}>
                                    <MaterialCommunityIcons name="close-circle-outline" size={30} color="black" />
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
                    <View style={[props.isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                        <View style={styles.modalRequestView}>
                            <Text style={styles.modalText}>{code}</Text>
                            <Text style={styles.modalHeader}>{household?.name}</Text>
                            <Text style={styles.modalText}>{household?.id}</Text>
                            <Text style={styles.modalText}> Välj en medlemsavatar:</Text>
                            <View style={styles.avatars}>
                                {emojis?.map(function (name, index) {
                                    return (
                                        <TouchableOpacity onPress={() => avatarSelect(Number(name))} key={index}>
                                            <Text style={styles.avatar}>{Avatars[Number(name)]}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            <View>
                                {avatar && (
                                    <Text style={{ marginTop: 40, fontSize: 20 }}>
                                        Vald avatar:
                                        <Text style={styles.avatar}> {avatar} </Text>
                                    </Text>
                                )}
                            </View>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => onApply()} style={styles.saveButton}>
                                    <MaterialIcons name="add-circle-outline" size={30} color="black" />
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
                                    <MaterialCommunityIcons name="close-circle-outline" size={30} color="black" />
                                    <Text style={styles.buttonText}>Avbryt</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    modalHeader: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 30,
    },
    avatar: {
        fontSize: 45,
        marginHorizontal: 15,
        marginVertical: 10,
        flexWrap: "wrap",
    },
    avatars: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
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
        width: windowWidth - 20,
        height: windowHeight - 100,
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
export default JoinHouseholdModal;
