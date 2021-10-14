import React, { FC } from "react";
import { FlatList, View } from "react-native";
import Household from "../../../Common/src/Entity/household";
import HouseholdComponent from "../../component/household.component/household.component";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.HouseholdScreen>;

const HouseholdScreen: FC<Props> = ({
  navigation,
}: Props): React.ReactElement => {
  const clickOnHousehold = () => {
    navigation.navigate(MainRoutes.TasksScreen);
  };

  return (
    <>
      <View>
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

let households: Household[] = [
  { name: "Hemma", JoinCode: 1234, id: "1" },
  { name: "Stugan", JoinCode: 1337, id: "2" },
];
