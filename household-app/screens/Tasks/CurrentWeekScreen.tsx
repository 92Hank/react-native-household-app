import React, { FC } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import PieChart from "../../component/PieChart";
import task from "../../../Common/Task";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

/**
 * key: number - assigned by the component.
 * userId: string - equals member.userId.
 * emoji: - equals member.emoji.
 * tasksDone: string[] - equals doneTask.id.
 * svg: {} is pre-determined.
 */
 export type MemberStatistics = {
    key: number,
    userId: string,
    emoji: "🦊" | "🐷" | "🐸" | "🐥" | "🐙" | "🐬" | "🦉" | "🦄",
    tasksDone: string[],
    svg: {
        fill: string,
        onPress: () => void
    },
}

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastMonthScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
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

export default LastMonthScreen;

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
