import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { household } from "../../../Common/household";
import AddHouseholdModal from "../../component/householdComponents/addHouseholdModal/addHouseholdModal.component";
// import Household from "../../../Common(obsolete)/household";
import HouseholdComponent from "../../component/householdComponents/household.component/household.component";
import JoinHouseholdModal from "../../component/householdComponents/joinHouseholdModal/joinHouseholdModal.component";
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
    const currentHousehold = useAppSelector(selectSelectedHousehold);

    if (!user) {
        navigation.navigate(MainRoutes.LoginScreen);
        return <View></View>;
    }
    const { data, isLoading, isFetching, isError, error } = useGetHouseholdByUserIdQuery(user.id!);

    // useEffect(() => {
    //   if (!user) navigation.navigate(MainRoutes.LoginScreen);
    // }, [user])

    const clickOnHousehold = (item: household) => {
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
                    onPress={onPressUsersInHousehold}
                    // style={styles.householdButton}
                >
                    <FontAwesome5 name="house-user" size={24} color="black" />
                    {/* <Text style={styles.householdButtonText}>Medlemmar</Text> */}
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={onPressLogout} style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View>
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
                    <TouchableOpacity onPress={onPressCreateHousehold} style={styles.householdButton}>
                        <MaterialIcons name="add-circle-outline" size={30} color="black" />
                        <Text style={styles.householdButtonText}>Nytt hushåll</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressJoinHousehold} style={styles.householdButton}>
                        <MaterialCommunityIcons name="home-circle-outline" size={30} color="black" />
                        <Text style={styles.householdButtonText}>Gå med</Text>
                    </TouchableOpacity>
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
