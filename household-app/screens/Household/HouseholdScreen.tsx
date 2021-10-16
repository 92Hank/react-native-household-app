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
      </View>
    </>
  );
};

export default HouseholdScreen;

const styles = StyleSheet.create({
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
});

let households: Household[] = [
  { name: "Hemma", JoinCode: 1234, id: "1" },
  { name: "Stugan", JoinCode: 1337, id: "2" },
];
