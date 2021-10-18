import React, { FC, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Household from "../../../Common/household";
import HouseholdComponent from "../../component/household.component/household.component";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import AddHouseholdModal from "../../component/addHousehold/addHouseholdModal";

type Props = FeedStackScreenProps<MainRoutes.HouseholdScreen>;

const HouseholdScreen: FC<Props> = ({
  navigation,
}: Props): React.ReactElement => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const clickOnHousehold = () => {
    navigation.navigate(MainRoutes.TasksScreen);
  };

  const onPressLogout = () => {
    navigation.navigate(MainRoutes.LoginScreen);
  };

  const onPressCreateHousehold = () => {
    setModalIsOpen(true)
  };
    const handleModalClose = () => {
      console.log("close");
      setModalIsOpen(false);
    };

  const onPressJoinHousehold = () => {
    alert("Join Household");
  };

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
              data={households}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }) => (
                <HouseholdComponent
                  key={item.id}
                  household={item}
                  onPress={clickOnHousehold}
                />
              )}
            />
          </View>
        </View>
        <AddHouseholdModal
          isOpen={modalIsOpen}
          handleModalClose={handleModalClose}
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

let households: Household[] = [
  { name: "Hemma", JoinCode: 1234, id: "1" },
  { name: "Stugan", JoinCode: 1337, id: "2" },
];
