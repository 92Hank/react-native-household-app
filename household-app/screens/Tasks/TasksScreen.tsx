/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TaskModal from "../../component/householdComponents/taskModal/taskModal";
import ModalComponent from "../../component/modal/ModalComponent";
import TaskCard from "../../component/taskFolder/TaskCard";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useGetDoneTasksWithHouseholdIdQuery } from "../../Redux/Service/doneTask/doneTaskApi";
import { useGetTaskByHouseholdIdQuery } from "../../Redux/Service/task/taskApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;
const deviceHeight = Math.round(Dimensions.get("window").height);

const TasksScreen: FC<Props> = ({ navigation, event }: Props): React.ReactElement => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [render, setRender] = useState(false);
    const [tasks, setTasks] = useState<TaskNow[]>();
    const [isClickedTaskOpen, setIsClickedTaskOpen] = useState(false);
    const [taskInModal, setTaskInModal] = useState<TaskNow>();
    const [rights, setRights] = useState(false);
    const user = useAppSelector(selectCurrentLoginUser);

    const { data: tasksData } = useGetTaskByHouseholdIdQuery(currentHousehold?.id!);
    const { data: doneTasksData } = useGetDoneTasksWithHouseholdIdQuery(currentHousehold?.id!);

    const isToday = (someDate: any): boolean => {
        const today = new Date();
        const value = new Date(someDate._seconds * 1000);
        return (
            value.getDate() === today.getDate() &&
            value.getMonth() === today.getMonth() &&
            value.getFullYear() === today.getFullYear()
        );
    };

    const dateConvert = (date: any): Date => {
        const hejsan = new Date(date._seconds * 1000);
        console.log("NYA DATUMET", hejsan);
        return hejsan;
    };

    useEffect(() => {
        currentHousehold?.member.forEach((m) => {
            if (m.userId === user?.id && m.isOwner) {
                setRights(true);
            }
        });
    }, [rights]);

    useEffect(() => {
        const allTasks: TaskNow[] = [];
        tasksData?.forEach((t) => {
            const taskItem: TaskNow = {
                id: t.id as string,
                name: t.name,
                householdId: t.houseHoldId,
                description: t.description,
                repeated: t.repeated,
                archived: t.archived,
                value: t.value,
                emojiList: [],
            };

            if (t.createdAt) {
                taskItem.createdAt = dateConvert(t.createdAt);
            }
            allTasks.push(taskItem);
            console.log("SKAPAD", taskItem.createdAt);

            doneTasksData?.forEach((d) => {
                console.log("DATUM GJORD", taskItem.dateDone);
                const today: boolean = isToday(d.dateDone);
                if (t.id === d.taskId && today) {
                    currentHousehold?.member.forEach((m) => {
                        if (d.userId === m.userId) {
                            allTasks[allTasks.length - 1].emojiList.push(m.emoji);
                            setTasks(allTasks);
                        } else {
                            allTasks[allTasks.length - 1].dateDone = dateConvert(d.dateDone);
                            setTasks(allTasks);
                        }
                    });
                } else {
                    setTasks(allTasks);
                }
            });
        });
        if (allTasks.length > 0) {
            setRender(true);
        }
    }, [tasksData, doneTasksData]);

    const clickOnTask = (task: TaskNow) => {
        setTaskInModal(task);
        setIsClickedTaskOpen(true);
        console.log("click on task,");
    };
    const handleTaskClose = () => {
        setIsClickedTaskOpen(false);
    };

    const handleAddClick = () => {
        setAddModalOpen(true);
        console.log("open");
    };
    const handleAddClose = () => {
        console.log("close");
        setAddModalOpen(false);
    };

    const onPressUsersInHousehold = () => {
        navigation.navigate(MainRoutes.UsersInHouseHoldScreen);
    };

    return (
        <View style={styles.container}>
            {render && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={tasks}
                        keyExtractor={(item: TaskNow) => item.id}
                        renderItem={({ item }) => (
                            <TaskCard key={item.id} task={item} onPress={() => clickOnTask(item)} />
                        )}
                    />
                    <ModalComponent isOpen={addModalOpen} handleAddClose={handleAddClose} event={event} />
                    <TaskModal
                        isOpen={isClickedTaskOpen}
                        handleModalClose={handleTaskClose}
                        task={taskInModal as TaskNow}
                    />
                </View>
            )}
            <View style={rights ? styles.buttonsContainer : styles.buttonsContainerUser}>
                {rights && (
                    <TouchableOpacity onPress={handleAddClick} style={styles.householdButton}>
                        <MaterialIcons name="add-circle-outline" size={30} color="black" />
                        <Text style={styles.householdButtonText}>Lägg till</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    onPress={onPressUsersInHousehold}
                    style={rights ? styles.householdButton : styles.householdButtonUser}
                >
                    <Feather name="users" size={30} color="black" />
                    <Text style={styles.householdButtonText}>Medlemmar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TasksScreen;

const styles = StyleSheet.create({
    listContainer: {
        maxHeight: deviceHeight - 241,
    },
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
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: "45%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        borderRadius: 20,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        height: 55,
    },
    householdButtonUser: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: "45%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        borderRadius: 20,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        height: 55,
    },
    buttonText: {
        color: "grey",
        fontSize: 16,
    },
    householdButtonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
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
    },
    buttonsContainerUser: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
});

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
