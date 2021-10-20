import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
// import Household from "../../../Common(obsolete)/household";
import HouseholdComponent from "../../component/householdComponents/household.component/household.component";
// import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import styles from "./styles";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import AddHouseholdModal from "../../component/householdComponents/addHouseholdModal/addHouseholdModal.component";
import JoinHouseholdModal from "../../component/householdComponents/joinHouseholdModal/joinHouseholdModal.component";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { logout } from "../../Redux/features/loginUser/loginUserSlice";
import { useGetHouseholdByUserIdQuery } from "../../Redux/Service/household/householdApi";
import Household from "../../Redux/entity/household"

// type Props = FeedStackScreenProps<MainRoutes.HouseholdScreen>;

const HouseholdScreen = ({
  navigation,
}: any): React.ReactElement => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [joinModalIsOpen, setJoinModalIsOpen] = useState(false);
   const dispatch = useAppDispatch();
   const user = useAppSelector(selectCurrentLoginUser);
   
   if (!user){
     navigation.navigate('LoginScreen');
     return <View></View>
   } 
  const { data, isLoading, isFetching, isError, error } =
    useGetHouseholdByUserIdQuery(user.id!);
 

  // useEffect(() => {
  //   if (!user) navigation.navigate(MainRoutes.LoginScreen);
  // }, [user])


  const clickOnHousehold = (id: string) => {
    console.log(id);
    navigation.navigate("TasksScreen", {
      screen: "Today",
      params: {
        householdId: id,
      },
    });
    // navigation.navigate('TasksScreen');
  };

  const onPressLogout = () => {
    dispatch(logout());
    navigation.navigate('LoginScreen');
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
    navigation.navigate('UsersInHouseHoldScreen');
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
                  onPress={() => clickOnHousehold(item.id)}
                />
              )}
            />
          </View>
        </View>
        <AddHouseholdModal
          isOpen={createModalIsOpen}
          handleModalClose={handleCreateModalClose}
        />
        <JoinHouseholdModal
          isOpen={joinModalIsOpen}
          handleModalClose={handleJoinModalClose}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={onPressCreateHousehold}
            style={styles.householdButton}
          >
            <MaterialIcons name="add-circle-outline" size={30} color="black" />
            <Text style={styles.householdButtonText}>Nytt hushåll</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressJoinHousehold}
            style={styles.householdButton}
          >
            <MaterialCommunityIcons
              name="home-circle-outline"
              size={30}
              color="black"
            />
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


