import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { FC, useContext, useEffect, useState } from "react";
import { Dimensions, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text, TextInput, useTheme } from "react-native-paper";
import { household, householdJoin } from "../../../../Common/household";
import { snackbarContext } from "../../../context/snackBarContext";
import { webUrl } from "../../../Redux/Config";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { useJoinHouseholdMutation } from "../../../Redux/Service/household/householdApi";
import { FeedStackScreenProps, MainRoutes } from "../../../routes/routes";

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
    const [renderAvatar, setRenderAvatar] = useState(false);
    const { setSnackbar } = useContext(snackbarContext);
    const { colors } = useTheme();

    const user = useAppSelector(selectCurrentLoginUser);
    const [JoinHousehold, { status, isSuccess, error, isLoading }] = useJoinHouseholdMutation();

    let avatars = Object.keys(Avatars).filter((key) => !isNaN(Number(key)));
    const existingAvatars: Avatars[] = [];

    useEffect(() => {
        if (isSuccess) {
            setSnackbar("Ansökan om att gå med i hushåll skickad", true);
            props.handleModalClose();
            setCodeSubmitted(false);
            setRenderAvatar(false);
        }
    }, [isSuccess]);

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
        setAvatarIndex(index);
        const selectedAvatar = Avatars[index];
        setAvatar(selectedAvatar);
        setRenderAvatar(true);
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
                const foundHousehold: household = await rawResponse.json();
                foundHousehold.member.forEach((element) => {
                    existingAvatars.push(element.emoji);
                });
                avatars = avatars.filter((val) => !existingAvatars.includes(Number(val)));
                setAvatars(avatars);

                const alreadyMember = foundHousehold.member.find((m) => m.userId === user.id);
                if (alreadyMember) {
                    setSnackbar("Du är redan medlem i det här hushållet eller väntar på svar", true);
                } else {
                    setCodeSubmitted(true);
                    setHousehold(foundHousehold);
                }
            } else {
                setSnackbar("Inget hushåll hittat på denna kod", true);
            }
        } else {
            setSnackbar("APAPAP! Du måste ange en kod", true);
        }
    };

    function onApply(): void {
        if (!renderAvatar) {
            setSnackbar("APAPAP! Du måste ange en kod", true);
            return;
        }
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
                    <Surface style={[props.isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                        <Surface style={{ ...styles.modalView, backgroundColor: colors.contrastColor }}>
                            <Text style={styles.modalText}>Ange hushållskod: </Text>
                            <TextInput
                                theme={{ roundness: 10 }}
                                outlineColor="white"
                                mode="outlined"
                                style={{ ...styles.input, backgroundColor: colors.inputColor }}
                                value={code}
                                label="Hushållskod"
                                onChangeText={onChangeInput}
                                textAlign={undefined}
                            />

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                    onPress={() => onSubmit()}
                                    style={{ ...styles.saveButton, backgroundColor: colors.blackWhiteToggle }}
                                >
                                    <MaterialIcons
                                        name="add-circle-outline"
                                        size={30}
                                        color={colors.whiteBlackToggle}
                                    />
                                    <Text style={styles.buttonText}>Sök</Text>
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
            ) : (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.isOpen}
                    onRequestClose={() => {
                        props.isOpen;
                    }}
                >
                    <Surface style={[props.isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                        <Surface style={{ ...styles.modalRequestView, backgroundColor: colors.contrastColor }}>
                            <Text style={styles.modalHeader}>{household?.name}</Text>
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
                                {avatar && renderAvatar && (
                                    <Text style={{ marginTop: 40, fontSize: 20 }}>
                                        Vald avatar:
                                        <Text style={styles.avatar}> {avatar} </Text>
                                    </Text>
                                )}
                            </View>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                    onPress={() => onApply()}
                                    style={{ ...styles.saveButton, backgroundColor: colors.blackWhiteToggle }}
                                >
                                    <MaterialIcons
                                        name="add-circle-outline"
                                        size={30}
                                        color={colors.whiteBlackToggle}
                                    />
                                    <Text style={styles.buttonText}>Ansök</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.handleModalClose();
                                        setCodeSubmitted(false);
                                        setCode("");
                                    }}
                                    style={{ ...styles.closeButton, backgroundColor: colors.blackWhiteToggle }}
                                >
                                    <MaterialCommunityIcons
                                        name="close-circle-outline"
                                        size={30}
                                        color={colors.whiteBlackToggle}
                                    />
                                    <Text style={styles.buttonText}>Avbryt</Text>
                                </TouchableOpacity>
                            </View>
                        </Surface>
                    </Surface>
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
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalRequestView: {
        width: windowWidth - 20,
        height: windowHeight - 200,
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
        width: 300,
        height: 300,
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
        borderBottomLeftRadius: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
});
export default JoinHouseholdModal;
