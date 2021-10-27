import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { FC, useContext, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { household } from "../../../Common/household";
import Button from "../../component/common/Button";
import AddHouseholdModal from "../../component/householdComponents/addHouseholdModal/addHouseholdModal.component";
import HouseholdComponent from "../../component/householdComponents/household.component/household.component";
import JoinHouseholdModal from "../../component/householdComponents/joinHouseholdModal/joinHouseholdModal.component";
import SnackbarComponent from "../../component/snackbar/snackbarComponent";
import { snackbarContext } from "../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { logout } from "../../Redux/features/loginUser/loginUserSlice";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { setSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useGetHouseholdByUserIdQuery } from "../../Redux/Service/household/householdApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import styles from "./styles";

type Props = FeedStackScreenProps<MainRoutes.HouseholdScreen>;

const HouseholdScreen: FC<Props> = ({ navigation, route }: Props): React.ReactElement => {
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [joinModalIsOpen, setJoinModalIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentLoginUser);
    const { isVisible, message, setSnackbar } = useContext(snackbarContext);

    const currentHousehold = useAppSelector(selectSelectedHousehold);

    if (!user) {
        navigation.navigate(MainRoutes.LoginScreen);
        return <View></View>;
    }

    const { data, isLoading, isFetching, isError, error } = useGetHouseholdByUserIdQuery(user.id!);

    const clickOnHousehold = (item: household) => {
        item.member.forEach((m) => {
            if (m.userId === user.id && (m.AcceptedStatus === "pending" || m.AcceptedStatus === "rejected")) {
                setSnackbar("Du har inte rättigheter att se detta hushåll än", true);
                return;
            }
        });
        dispatch(setSelectedHousehold(item));
        navigation.navigate(MainRoutes.TasksScreen);
    };

    const onPressLogout = () => {
        dispatch(logout());
        navigation.navigate(MainRoutes.LoginScreen);
    };

    const onPressCreateHousehold = () => {
        setCreateModalIsOpen(true);
    };

    const onPressJoinHousehold = () => {
        setJoinModalIsOpen(true);
    };
    const handleCreateModalClose = () => {
        setCreateModalIsOpen(false);
    };
    const handleJoinModalClose = () => {
        setJoinModalIsOpen(false);
    };

    const onPressUsersInHousehold = () => {
        navigation.navigate(MainRoutes.UsersInHouseHoldScreen);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={onPressLogout}
                    // style={styles.householdButton}
                >
                    <FontAwesome5 name="sign-out-alt" size={24} color="black" />
                    {/* <Text style={styles.householdButtonText}>Medlemmar</Text> */}
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <>
            <View style={styles.container}>
                <SnackbarComponent isVisible={isVisible} message={message} />
                <View>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={data}
                            keyExtractor={(item: any) => item.id}
                            renderItem={({ item }) => (
                                <HouseholdComponent
                                    key={item.id}
                                    household={item}
                                    onPress={() => clickOnHousehold(item)}
                                />
                            )}
                        />
                    </View>
                </View>
                <AddHouseholdModal
                    isOpen={createModalIsOpen}
                    handleModalClose={handleCreateModalClose}
                    navigation={navigation}
                    route={route}
                />
                <JoinHouseholdModal
                    isOpen={joinModalIsOpen}
                    handleModalClose={handleJoinModalClose}
                    navigation={navigation}
                    route={route}
                />
                <View style={styles.buttonsContainer}>
                    <Button
                        iconType={{ type: "MaterialIcons", icons: "add-circle-outline" }}
                        onPress={onPressCreateHousehold}
                        text="Nytt hushåll"
                    ></Button>
                    {/* <TouchableOpacity onPress={onPressCreateHousehold} style={styles.householdButton}>
                        <MaterialIcons name="add-circle-outline" size={30} color="black" />
                        <Text style={styles.householdButtonText}>Nytt hushåll</Text>
                    </TouchableOpacity> */}
                    <Button
                        iconType={{ type: "MaterialCommunityIcons", icons: "home-circle-outline" }}
                        onPress={onPressJoinHousehold}
                        text="Gå med"
                    ></Button>
                    {/* <TouchableOpacity onPress={onPressJoinHousehold} style={styles.householdButton}>
                        <MaterialCommunityIcons name="home-circle-outline" size={30} color="black" />
                        <Text style={styles.householdButtonText}>Gå med</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </>
    );
};

export default HouseholdScreen;

// let households: Household[] = [
//   { name: "Hemma", JoinCode: 1234, id: "1" },
//   { name: "Stugan", JoinCode: 1337, id: "2" },
// ];
