import React, { FC, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Card, Title } from 'react-native-paper';
import doneTask from '../../../Common/doneTask';
import Task from "../../../Common/Task";

import TaskItem from '../../component/taskFolder/taskItem';
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const TasksScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {

  const clickOnTask = () => {
    console.log("click on task f");
  }


  // borde bara skicka in dagens task här
  return (
    <SafeAreaView>
      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <TaskItem key={item.id} task={item} onPress={clickOnTask} />
            </Card.Content>
          </Card>
        )}
      />
    </SafeAreaView>
  );
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
  card: {
    flexDirection: "row",
    shadowOffset: { width: 5, height: 5 },
    width: "90%",
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 5,
  },
});

let tasks: Task[] = [
  { description: "foo", value: 1, id: "abc"},
  { description: "foo2", value: 2, id: "abc2" },
];


