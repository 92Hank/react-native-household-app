import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { List, Surface } from "react-native-paper";
import TaskModal from "../householdComponents/taskModal/taskModal";

interface TaskNow {
    id: string;
    name: string;
    householdId?: string;
    description?: string;
    repeated?: number;
    archived?: boolean;
    value?: number;
    emojiList: number[];
    dateDone?: Date;
    createdAt?: Date;
}

interface Props {
    archivedTasks: TaskNow[];
}

const ArchivedTaskCard = (props: Props) => {
    const [expanded, setExpanded] = React.useState(false);
    const [taskInModal, setTaskInModal] = useState<TaskNow>();
    const [isClickedTaskOpen, setIsClickedTaskOpen] = useState(false);

    const clickOnTask = (task: TaskNow) => {
        setTaskInModal(task);
        setIsClickedTaskOpen(true);
        console.log("click on task,");
    };
    const handleTaskClose = () => {
        setIsClickedTaskOpen(false);
    };

    const handlePress = () => setExpanded(!expanded);
    const onPressTask = () => {
        console.log("Få upp modalen för att redigera syssla och ta bort arkivering?");
    };

    return (
        <View>
            <List.Section>
                <List.Accordion
                    title="Arkiverade sysslor"
                    expanded={expanded}
                    onPress={handlePress}
                    titleStyle={styles.title}
                >
                    <FlatList
                        data={props.archivedTasks}
                        keyExtractor={(item: TaskNow) => item.id}
                        renderItem={({ item }) => (
                            <Surface style={styles.listItem}>
                                <TouchableOpacity onPress={onPressTask}>
                                    {/* Falskt felmeddelande */}
                                    <List.Item
                                        titleStyle={styles.item}
                                        title={item.name}
                                        onPress={() => clickOnTask(item)}
                                    />
                                </TouchableOpacity>
                            </Surface>
                        )}
                    />
                </List.Accordion>
            </List.Section>
            <View>
                <TaskModal
                    isOpen={isClickedTaskOpen}
                    handleModalClose={handleTaskClose}
                    task={taskInModal as TaskNow}
                />
            </View>
        </View>
    );
};

export default ArchivedTaskCard;
const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
    item: {
        fontWeight: "bold",
        fontSize: 22,
    },
    listItem: {
        width: deviceWidth - 20,
        alignContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 6,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
    },
    title: {
        fontSize: 20,
    },
});