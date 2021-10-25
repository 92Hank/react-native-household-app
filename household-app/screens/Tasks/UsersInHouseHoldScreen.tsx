/* eslint-disable react/jsx-no-undef */
import React, { FC, useContext, useState } from "react";
import { View, TouchableOpacity, FlatList, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HouseholdComponent from "../../component/householdComponents/household.component/household.component";
import UserListComponent from "../../component/taskFolder/UserListComponent";
import ChangeMemberStatusModal from "../../component/householdComponents/changeMemberStatusModal/changeMemberStatusModal";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { defineAnimation } from "react-native-reanimated";
import { useAppSelector } from "../../Redux/hooks";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import SnackbarComponent from "../../component/snackbar/snackbarComponent";
import { snackbarContext } from "../../context/snackBarContext";

type Props = FeedStackScreenProps<MainRoutes.UsersInHouseHoldScreen>;

const UsersInHouseHoldScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const [modalOpen, setModalOpen] = useState(false);
    const [member, setSetMember] = useState<fullMemberInfo>();
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const { message, isVisible } = useContext(snackbarContext);

    const clickOnMember = (item: fullMemberInfo) => {
        console.log("click");
        setSetMember(item);
        setModalOpen(true);
        console.log("open");
    };

    const handleClose = () => {
        console.log("close");
        setModalOpen(false);
    };
    const handleLeaveClick = () => {
        console.log("open modal to get option to leave");
    };
    return (
        <View style={styles.container}>
            <SnackbarComponent isVisible={isVisible} message={message} />
            <View>
                <View>
                    <FlatList
                        data={currentHousehold?.member}
                        keyExtractor={(item: any) => item.userId}
                        renderItem={({ item }) => (
                            <UserListComponent key={item.userId} member={item} onPress={() => clickOnMember(item)} />
                        )}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={handleLeaveClick} style={styles.householdButton}>
                        <MaterialIcons name="delete-forever" size={30} color="black" />
                        <Text style={styles.householdButtonText}>Lämna hushåll</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ChangeMemberStatusModal
                isOpen={modalOpen}
                handleModalClose={handleClose}
                member={member as fullMemberInfo}
            />
        </View>
    );
};

export default UsersInHouseHoldScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerButton: {
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        color: "grey",
    },
    logoutButton: {
        margin: 15,
        backgroundColor: "#D8D8D8",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 100,
        width: 100,
        alignItems: "center",
    },
    buttonText: {
        color: "grey",
        fontSize: 16,
    },
    text: {
        color: "grey",
    },
    householdButton: {
        margin: 15,
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
    buttonsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10,
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
