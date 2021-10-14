import React, { FC } from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Task from "../../../Common/src/Entity/Task";

import TaskItem from '../../component/taskFolder/taskItem';
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const TasksScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
  const clickOnTask = () => {
    console.log("click on task");
  }

  return (
    <SafeAreaView>
      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <TaskItem key={item.id} task={item} onPress={clickOnTask} />
        )}
      />
    </SafeAreaView>
  )
};

export default TasksScreen;

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

let tasks: Task[] = [
  { description: "foo", value: 1, id: "abc" },
  { description: "foo2", value: 2, id: "abc2" },
];
