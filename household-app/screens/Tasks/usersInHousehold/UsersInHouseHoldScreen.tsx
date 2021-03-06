/* eslint-disable react/jsx-no-undef */
import React, { FC, useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import Button from "../../../component/common/Button";
import ChangeHouseholdNameModal from "../../../component/householdComponents/changeHouseholdNameModal/changeHouseholdNameModal";
import ChangeMemberStatusModal from "../../../component/householdComponents/changeMemberStatusModal/changeMemberStatusModal";
import LeaveModal from "../../../component/householdComponents/leaveModal/leaveModal";
import PendingMemberTaskCard from "../../../component/householdComponents/pendingMemberCard/pendingMemberCard";
import SnackbarComponent from "../../../component/snackbar/snackbarComponent";
import HouseholdComponent from "../../../component/taskFolder/householdComponent";
import { snackbarContext } from "../../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { useLazyGetHouseholdByIdQuery, useLeaveHouseholdMutation } from "../../../Redux/Service/household/householdApi";
import { FeedStackScreenProps, MainRoutes } from "../../../routes/routes";
import styles from "./styles";

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
        if (!rights) {
            setSnackbar("Du har inte r??ttigheter att ??ndra medlemsstatus", true);
            return;
        }
        if (item.isOwner) {
            setSnackbar("En ??gare kan man inte ??ndra status p??", true);
            return;
        }
        setSetMember(item);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const closeNameModal = () => setOpenChangeName(false);

    const handleLeaveClick = () => {
        leaveHouseHoldApi({ houseHoldId: result.data?.id as string, userId: user.id as string });
        setOpenLeaveModal(false);
    };

    const openLeaveModalClick = () => {
        setOpenLeaveModal(true);
    };

    const closeLeaveModalClick = () => {
        setOpenLeaveModal(false);
    };

    const changeNameModal = () => {
        setOpenChangeName(true);
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
            setSnackbar("Du har l??mnat hush??ll: " + result.data?.name, true);
            navigation.navigate(MainRoutes.HouseholdScreen);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            console.log(error);
            setSnackbar("Ett ov??ntat fel d??k upp", true);
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
                    <Text style={styles.inviteCode}>Hush??llskod: {result.data?.inviteCode}</Text>
                </Surface>
                <View style={styles.listContainer}>
                    <FlatList
                        data={members}
                        keyExtractor={(item: any) => item.userId}
                        renderItem={({ item }) => (
                            <HouseholdComponent key={item.userId} member={item} onPress={() => clickOnMember(item)} />
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
                )}
                <Button
                    iconType={{ type: "MaterialIcons", icons: "delete-forever" }}
                    onPress={openLeaveModalClick}
                    text="L??mna hush??ll"
                ></Button>
            </View>
        </View>
    );
};

export default UsersInHouseHoldScreen;

interface fullMemberInfo {
    name: string;
    userId: string;
    emoji: number;
    isPaused: boolean;
    isOwner: boolean;
    AcceptedStatus: "accepted" | "pending" | "rejected";
}
