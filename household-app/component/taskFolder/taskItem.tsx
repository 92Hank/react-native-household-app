import React, { useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Card, Avatar } from "react-native-paper";
import Task from "../../../Common/src/Entity/Task";
import DoneTask from "../../../Common/src/Entity/doneTask" 

interface Props {
  task: Task;
  onPress: () => void;
  // doneTask: DoneTask[];
}

export default function TaskItem(props: Props) {
  const [memberHasDoneThisTask, setMemberHasDoneThisTask] = useState();

  // useEffect(() => {
  //   const doneTask = props.doneTask;
  //   doneTask.forEach((t) => {
  //     if(t.taskId === props.task.id){
  //       // hämta members med detta member ID
  //       // vi måste han nån typ av klocka som känner av date när vi byter datum
  //       t.memberId
  //     }
  //   })
  // })



  return (
    <View>
      <Pressable onPress={props.onPress}>
        <View>
          <Card.Title
            title={props.task.description}
            right={(props) => <Avatar.Icon {...props} icon="folder" />}
          />
        </View>
      </Pressable>
    </View>
  );
}
