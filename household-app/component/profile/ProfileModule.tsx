import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text, TextInput, useTheme } from "react-native-paper";
import { fullMemberInfo, updateMember } from "../../../Common/household";
import { Avatars } from "../../component/common/EmojiSelector";
import ProfileEmojiSelector from "../../component/profile/ProfileEmojiSelector";
import { snackbarContext } from "../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { setSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useLazyGetHouseholdByIdQuery, useUpdateMemberMutation } from "../../Redux/Service/household/householdApi";

interface Props {
    isOpen: boolean;
    handleModalClose: () => void;
}

function ProfileModule({ isOpen, handleModalClose }: Props) {
    const { setSnackbar } = useContext(snackbarContext);
    const dispatch = useAppDispatch();

    const [originalMember, setOriginalMember] = useState<fullMemberInfo>();
    const [editMember, setEditMember] = useState<fullMemberInfo>();
    const user = useAppSelector(selectCurrentLoginUser);
    const household = useAppSelector(selectSelectedHousehold);
    const { colors } = useTheme();

    const [getDbHousehold, dbHousehold] = useLazyGetHouseholdByIdQuery();

    const [updateMember, { status }] = useUpdateMemberMutation();

    useEffect(() => {
        if (!household || !user) return;
        getDbHousehold(household.id);
    }, []);
    useEffect(() => {
        if (!dbHousehold.data || !household || !user) return;

        const member = dbHousehold.data.member.find((m) => m.userId === user.id);
        if (member) {
            setOriginalMember(member);
            setEditMember(member);
        }
    }, [dbHousehold.data]);

    useEffect(() => {
        if (status) {
            console.log("status", status);
        }
    }, [status]);

    if (!household || !user) return <></>;

    const save = () => {
        if (!editMember || !originalMember || !dbHousehold.data || !user.id) return;
        const updateDto: updateMember = {
            houseHoldId: dbHousehold.data.id,
            userId: user.id,
        };

        if (originalMember.emoji !== editMember.emoji) {
            updateDto.emoji = editMember.emoji;
        }

        if (originalMember.name !== editMember.name) {
            updateDto.name = editMember.name;
        }

        if (updateDto.emoji || updateDto.name) {
            updateMember(updateDto);
        }

        // const copyMember = [...household.member];
        // const index = copyMember.findIndex((m) => m.userId === user.id);
        // if (~index) {
        //     copyMember[index] = editMember;

        //     dispatch(setSelectedHousehold({ ...household, member: [...copyMember] }));
        // }
        setSnackbar("Spara", true);
        handleModalClose();
    };

    const onChangeName = (name: string) => {
        if (!editMember) return;

        setEditMember({ ...editMember, name: name });
    };

    return (
        <View style={styles.centeredView}>
            {isOpen && editMember && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isOpen}
                    onRequestClose={() => {
                        isOpen;
                    }}
                >
                    <View style={[isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                        <View style={{ ...styles.modalView, backgroundColor: colors.contrastColor }}>
                            <Text style={styles.modalText}>Ändra profil </Text>
                            <ScrollView contentContainerStyle={styles.scrollableView}>
                                <TextInput
                                    theme={{ roundness: 10 }}
                                    outlineColor="white"
                                    mode="outlined"
                                    style={{ ...styles.input, backgroundColor: colors.inputColor }}
                                    value={editMember.name}
                                    onChangeText={onChangeName}
                                    textAlign={undefined}
                                    label="Namn i hushållet"
                                />

                                {dbHousehold.data && (
                                    <>
                                        <Text style={styles.avatarName}>Avatar i hushållet</Text>
                                        <ProfileEmojiSelector
                                            household={dbHousehold.data}
                                            avatar={editMember.emoji}
                                            newSelected={(avatar: Avatars) => {
                                                setEditMember({ ...editMember, emoji: avatar });
                                                console.log(avatar);
                                            }}
                                            currentAvatar={originalMember?.emoji}
                                        />
                                    </>
                                )}
                            </ScrollView>

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                    onPress={save}
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
                                    onPress={handleModalClose}
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
                        </View>
                    </View>
                    {/* <Surface style={[isOpen ? styles.centeredViewBlurred : styles.centeredView]}>
                        <Surface style={styles.modalView}>
                            <Text style={styles.modalText}>hushåll</Text>
                            {editMember && (
                                <Surface>
                                    <Surface>
                                        <TextInput
                                            label="Namn i hushållet"
                                            value={editMember.name}
                                            onChangeText={onChangeName}
                                        />
                                    </Surface>
                                    <ProfileEmojiSelector
                                        household={household}
                                        avatar={editMember.emoji}
                                        newSelected={(avatar: Avatars) => {
                                            setEditMember({ ...editMember, emoji: avatar });
                                            console.log(avatar);
                                        }}
                                        currentAvatar={originalMember?.emoji}
                                    />
                                    <View style={styles.buttonsContainer}>
                                        <TouchableOpacity onPress={save} style={styles.saveButton}>
                                            <MaterialIcons name="delete-forever" size={30} color="black" />
                                            <Text style={styles.buttonText}>Save</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleModalClose} style={styles.closeButton}>
                                            <MaterialCommunityIcons name="arrow-left-bold" size={30} color="black" />
                                            <Text style={styles.buttonText}>Nej</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Surface>
                            )}
                            {!editMember && (
                                <Surface>
                                    <Text>Loading...</Text>
                                </Surface>
                            )}
                            <Text style={styles.text}>Global</Text>
                            <ToggleDarkThemeSwitch />
                        </Surface>
                    </Surface> */}
                </Modal>
            )}
            {!editMember && (
                <Surface>
                    <Text>Loading...</Text>
                </Surface>
            )}
        </View>
    );
}

export default ProfileModule;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    scrollableView: {
        // padding: 35,
        // marginLeft: 20,
        // marginRight: 20,
        // marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        // height: "100%",
        // marginTop: 10,
    },
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
    labelName: {
        alignSelf: "flex-start",
        fontSize: 12,
    },
    avatarName: {
        alignSelf: "flex-start",
        fontSize: 12,
        marginBottom: 6,
    },
    input: {
        marginBottom: 16,
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
        // marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    modalView: {
        flex: 1,
        // margin: 20,
        width: windowWidth - 35,
        maxHeight: windowHeight - 150,
        // minHeight: windowHeight - 150,
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
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
});
