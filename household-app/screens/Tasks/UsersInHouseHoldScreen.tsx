/* eslint-disable react/jsx-no-undef */
import React, { FC, useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, FlatList, StyleSheet, Text, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HouseholdComponent from "../../component/householdComponents/household.component/household.component";
import UserListComponent from "../../component/taskFolder/householdComponent";
import ChangeMemberStatusModal from "../../component/householdComponents/changeMemberStatusModal/changeMemberStatusModal";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { defineAnimation } from "react-native-reanimated";
import { useAppSelector } from "../../Redux/hooks";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import SnackbarComponent from "../../component/snackbar/snackbarComponent";
import { snackbarContext } from "../../context/snackBarContext";
import LeaveModal from "../../component/householdComponents/leaveModal/leaveModal";
import { useLeaveHouseholdMutation } from "../../Redux/Service/household/householdApi";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import ChangeHouseholdNameModal from "../../component/householdComponents/changeHouseholdNameModal/changeHouseholdNameModal";
import { Surface } from "react-native-paper";
import PendingMemberTaskCard from "../../component/householdComponents/pendingMemberCard/pendingMemberCard";
// import { householdIdAndUserId } from "../../Redux/entity/household";

type Props = FeedStackScreenProps<MainRoutes.UsersInHouseHoldScreen>;

const UsersInHouseHoldScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const user = useAppSelector(selectCurrentLoginUser);
    if (!user) return <view></view>;

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

    const clickOnMember = (item: fullMemberInfo) => {
        console.log("click");

        currentHousehold?.member.forEach((m) => {
            if (m.userId === user.id && (m.AcceptedStatus === "pending" || m.AcceptedStatus === "rejected")) {
                setSnackbar("Du har inte rättigheter att ändra medlemsstatus", true);
                return;
            }
        });
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
        leaveHouseHoldApi({ houseHoldId: currentHousehold?.id as string, userId: user.id as string });
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
        if (currentHousehold) {
            setMembers(currentHousehold.member.filter((m) => m.AcceptedStatus === "accepted"));
            setPendingMembers(currentHousehold.member.filter((m) => m.AcceptedStatus === "pending"));
        }
    }, [currentHousehold]);

    useEffect(() => {
        if (isSuccess) {
            setSnackbar("Du har lämnat hushåll: " + currentHousehold?.name, true);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            console.log(error);
            setSnackbar("Ett oväntat fel dök upp", true);
        }
    }, [error]);

    useEffect(() => {
        currentHousehold?.member.forEach((m) => {
            if (m.userId === user?.id && m.isOwner) {
                setRights(true);
            }
        });
    }, [rights]);

    return (
        <View style={styles.container}>
            <SnackbarComponent isVisible={isVisible} message={message} />
            <View>
                <Surface>
                    <Text style={styles.inviteCode}>Hushållskod: {currentHousehold?.inviteCode}</Text>
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
                    <TouchableOpacity onPress={changeNameModal} style={styles.householdButton}>
                        <MaterialIcons name="change-history" size={30} color="black" />
                        <Text style={styles.householdButtonText}>Byt namn</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    onPress={openLeaveModalClick}
                    style={rights ? styles.householdButton : styles.householdButtonUser}
                >
                    <MaterialIcons name="delete-forever" size={30} color="black" />
                    <Text style={styles.householdButtonText}>Lämna hushåll</Text>
                </TouchableOpacity>
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
