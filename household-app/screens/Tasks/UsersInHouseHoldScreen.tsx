/* eslint-disable react/jsx-no-undef */
import React, { FC, useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import Button from "../../component/common/Button";
import ChangeHouseholdNameModal from "../../component/householdComponents/changeHouseholdNameModal/changeHouseholdNameModal";
import ChangeMemberStatusModal from "../../component/householdComponents/changeMemberStatusModal/changeMemberStatusModal";
import LeaveModal from "../../component/householdComponents/leaveModal/leaveModal";
import PendingMemberTaskCard from "../../component/householdComponents/pendingMemberCard/pendingMemberCard";
import SnackbarComponent from "../../component/snackbar/snackbarComponent";
import UserListComponent from "../../component/taskFolder/householdComponent";
import { snackbarContext } from "../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useLazyGetHouseholdByIdQuery, useLeaveHouseholdMutation } from "../../Redux/Service/household/householdApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.UsersInHouseHoldScreen>;
const UsersInHouseHoldScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const user = useAppSelector(selectCurrentLoginUser);

    const [modalOpen, setModalOpen] = useState(false);
    const [openLeaveModal, setOpenLeaveModal] = useState(false);
    const [member, setSetMember] = useState<fullMemberInfo>();
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const { message, isVisible, setSnackbar } = useContext(snackbarContext);
    const [leaveHouseHoldApi, { isSuccess, error }] = useLeaveHouseholdMutation();
    const [rights, setRights] = useState(false);
    const [openChangeName, setOpenChangeName] = useState(false);
    const [members, setMembers] = useState<fullMemberInfo[]>();
    const [pendingMembers, setPendingMembers] = useState<fullMemberInfo[]>();
    const [loadData, result] = useLazyGetHouseholdByIdQuery();

    useEffect(() => {
        if (!user || !currentHousehold) return;
        loadData(currentHousehold.id);
    }, []);
    if (!user || !currentHousehold) return <view></view>;

    const clickOnMember = (item: fullMemberInfo) => {
        console.log("click");

        if (!rights) {
            setSnackbar("Du har inte rättigheter att ändra medlemsstatus", true);
            return;
        }
        if (item.isOwner) {
            setSnackbar("En ägare kan man inte ändra status på", true);
            return;
        }
        setSetMember(item);
        setModalOpen(true);
        console.log("open");
    };

    const handleClose = () => {
        console.log("close");
        setModalOpen(false);
    };

    const closeNameModal = () => setOpenChangeName(false);

    const handleLeaveClick = () => {
        leaveHouseHoldApi({ houseHoldId: result.data?.id as string, userId: user.id as string });
        console.log("leave api");
        setOpenLeaveModal(false);
    };

    const openLeaveModalClick = () => {
        console.log("open");
        setOpenLeaveModal(true);
    };

    const closeLeaveModalClick = () => {
        console.log("close");
        setOpenLeaveModal(false);
    };

    const changeNameModal = () => {
        setOpenChangeName(true);
        console.log("change name modal");
    };

    useEffect(() => {
        const { data } = result;
        if (data?.member) {
            setMembers(data.member.filter((m) => m.AcceptedStatus === "accepted"));
            setPendingMembers(data.member.filter((m) => m.AcceptedStatus === "pending"));
        }
    }, [result.data]);

    useEffect(() => {
        if (isSuccess) {
            setSnackbar("Du har lämnat hushåll: " + result.data?.name, true);
            navigation.navigate(MainRoutes.HouseholdScreen);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            console.log(error);
            setSnackbar("Ett oväntat fel dök upp", true);
        }
    }, [error]);

    useEffect(() => {
        const { data } = result;
        data?.member.forEach((m) => {
            if (m.userId === user?.id && m.isOwner) {
                setRights(true);
            }
        });
    }, [result.data]);

    if (!user) return <view></view>;

    return (
        <View style={styles.container}>
            <SnackbarComponent isVisible={isVisible} message={message} />
            <View>
                <Surface>
                    <Text style={styles.inviteCode}>Hushållskod: {result.data?.inviteCode}</Text>
                </Surface>
                <View style={styles.listContainer}>
                    <FlatList
                        data={members}
                        keyExtractor={(item: any) => item.userId}
                        renderItem={({ item }) => (
                            <UserListComponent key={item.userId} member={item} onPress={() => clickOnMember(item)} />
                        )}
                    />
                    {rights && pendingMembers && <PendingMemberTaskCard pendingMember={pendingMembers} />}
                </View>
            </View>
            <ChangeMemberStatusModal
                isOpen={modalOpen}
                handleModalClose={handleClose}
                member={member as fullMemberInfo}
            />
            <LeaveModal
                isOpen={openLeaveModal}
                handleModalClose={closeLeaveModalClick}
                handleLeave={handleLeaveClick}
            />
            <ChangeHouseholdNameModal isOpen={openChangeName} handleModalClose={closeNameModal} />
            <View style={rights ? styles.buttonsContainer : styles.buttonsContainerUser}>
                {rights && (
                    <Button
                        iconType={{ type: "MaterialIcons", icons: "change-history" }}
                        onPress={changeNameModal}
                        text="Byt namn"
                    ></Button>
                    // <TouchableOpacity onPress={changeNameModal} style={styles.householdButton}>
                    //     <MaterialIcons name="change-history" size={30} color="black" />
                    //     <Text style={styles.householdButtonText}>Byt namn</Text>
                    // </TouchableOpacity>
                )}
                <Button
                    iconType={{ type: "MaterialIcons", icons: "delete-forever" }}
                    onPress={openLeaveModalClick}
                    text="Lämna hushåll"
                ></Button>

                {/* <TouchableOpacity
                    onPress={openLeaveModalClick}
                    style={rights ? styles.householdButton : styles.householdButtonUser}
                >
                    <MaterialIcons name="delete-forever" size={30} color="black" />
                    <Text style={styles.householdButtonText}>Lämna hushåll</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

export default UsersInHouseHoldScreen;

const deviceHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
    listContainer: {
        maxHeight: deviceHeight - 241,
    },
    container: {
        flex: 1,
    },
    text: {
        color: "grey",
    },
    card: {
        flexDirection: "row",
        shadowOffset: { width: 5, height: 5 },
        width: "90%",
        borderRadius: 12,
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    householdButton: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: "45%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        borderRadius: 20,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        height: 55,
    },
    inviteCode: {
        textAlign: "center",
        alignSelf: "center",
        width: "100%",
        height: 30,
        // color: "red",
    },
    householdButtonUser: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: "45%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        borderRadius: 20,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        height: 55,
    },
    buttonText: {
        color: "grey",
        fontSize: 16,
    },
    householdButtonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    buttonsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    buttonsContainerUser: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
});

interface fullMemberInfo {
    name: string;
    userId: string;
    emoji: number;
    isPaused: boolean;
    isOwner: boolean;
    AcceptedStatus: "accepted" | "pending" | "rejected";
}
