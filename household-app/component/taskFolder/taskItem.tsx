import React from "react";
import { Text, View, Pressable } from "react-native";
import { Task } from "../../../Common/Entity/Task";

interface Props {
  task: Task;
  onPress: () => void;
}

export default function TaskItem(props: Props) {
  return (
    <View>
      <Pressable onPress={props.onPress}>
        <View>
          <Text>{props.task.description}</Text>
        </View>
      </Pressable>
    </View>
  );
}
