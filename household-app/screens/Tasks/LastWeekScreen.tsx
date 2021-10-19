import React, { FC } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import task from "../../../Common/Task";
import PieChart from "../../component/PieChart";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { MemberStatistics } from "./memberStatistics";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastWeekScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
  const dagensDatum = new Date(1995, 11, 17);

  const allTasks: task[] = [
      { id: "100", value: 2 },
      { id: "101", value: 2 },
      { id: "102", value: 4 },
      { id: "500", value: 8 },
  ]

  const data: MemberStatistics[] = [
      { //DETTA ÄR EN USER
          key: 1,
          userId: "1",
          emoji: "🐙",
          tasksDone: ["100", "101", "102"],
          svg: {
              fill: '#600080',
              onPress: () => console.log('USER1'),
          },
      },
      { //DETTA ÄR EN USER
          key: 2,
          userId: "2",
          emoji: "🦊",
          tasksDone: ["100", "101"],
          svg: {
              fill: 'green',
              onPress: () => console.log('USER2'),
          },
      },
      { //DETTA ÄR EN USER
          key: 3,
          userId: "3",
          emoji: "🐸",
          tasksDone: ["100", "500"],
          svg: {
              fill: 'blue',
              onPress: () => console.log('USER3'),
          },
      },
      { //DETTA ÄR EN USER
          key: 4,
          userId: "999",
          emoji: "🦄",
          tasksDone: ["102"],
          svg: {
              fill: 'red',
              onPress: () => console.log('USER4'),
          },
      },
  ]


  return (
      <SafeAreaView>
          <View>
              <PieChart data={data} allTasks={allTasks} />
          </View>
      </SafeAreaView>
  )
};

export default LastWeekScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "grey",
  },
});
