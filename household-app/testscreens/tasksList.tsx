import React  from "react";
import { FlatList, SafeAreaView } from "react-native";
import Task from "../../Common/Entity/Task";
import TaskItem from "../component/taskFolder/taskItem";



function TaskListScreen({ navigation }: any) {

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
  );
}

export default TaskListScreen;


let tasks: Task[] = [
  { description: "foo", value: 1, id: "abc" },
  { description: "foo2", value: 3, id: "abc2" },
];
