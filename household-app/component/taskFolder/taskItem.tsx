import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { task } from "../../../Common/task";

interface Props {
    task: task;
    onPress: () => void;
}

export default function TaskItem(props: Props) {
    const [memberHasDoneThisTask, setMemberHasDoneThisTask] = useState();
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
