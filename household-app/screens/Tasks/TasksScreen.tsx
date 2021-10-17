import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import { Card, Title } from "react-native-paper";
import doneTask from "../../../Common/doneTask";
import Task from "../../../Common/Task";

import TaskItem from "../../component/taskFolder/taskItem";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import ModalComponent from "../../component/modal/ModalComponent";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const TasksScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const clickOnTask = () => {
    console.log("click on task f");
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
    console.log("open");

  };
  const handleAddClose = () => {
    console.log("close")
    setAddModalOpen(false);
  };

  const onPressCreateTasks = () => {
    alert("Add");
  };

  const onPressEditTasks = () => {
    alert("Edit");
  };
  // borde bara skicka in dagens task här
  return (
    <>
      <View style={styles.container}>
        <View>
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
          <ModalComponent
            isOpen={addModalOpen}
            handleAddClose={handleAddClose}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={handleAddClick}
            style={styles.householdButton}
          >
            <MaterialIcons name="add-circle-outline" size={30} color="black" />
            <Text style={styles.householdButtonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressEditTasks}
            style={styles.householdButton}
          >
            <Feather name="edit-2" size={30} color="black" />
            <Text style={styles.householdButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  householdButton: {
    margin: 15,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 100,
    width: 140,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  householdButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  buttonsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});

let tasks: Task[] = [
  { description: "foo", value: 1, id: "abc" },
  { description: "foo2", value: 2, id: "abc2" },
];
