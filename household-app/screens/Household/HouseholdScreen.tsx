import React, { FC } from "react";
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
import styles from './styles';

type Props = FeedStackScreenProps<MainRoutes.HouseholdScreen>;

const HouseholdScreen: FC<Props> = ({
  navigation,
}: Props): React.ReactElement => {
  const clickOnHousehold = () => {
    navigation.navigate(MainRoutes.TasksScreen);
  };

    const onPressLogout = () => {
      navigation.navigate(MainRoutes.LoginScreen);
    };

    const onPressCreateHousehold = () => {
      alert("Add Household");
    };

    const onPressJoinHousehold = () => {
      alert("Join Household");
    };

  return (
    <>
      <View>
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
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={onPressCreateHousehold}
            style={styles.householdButton}
          >
            <Text style={styles.householdButtonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressJoinHousehold}
            style={styles.householdButton}
          >
            <Text style={styles.householdButtonText}>Edit</Text>
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
