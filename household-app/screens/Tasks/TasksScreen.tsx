/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { FC, useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../../component/common/Button";
import TaskModal from "../../component/householdComponents/taskModal/taskModal";
import ModalComponent from "../../component/modal/ModalComponent";
import TaskCard from "../../component/taskFolder/TaskCard";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useGetDoneTasksWithHouseholdIdQuery } from "../../Redux/Service/doneTask/doneTaskApi";
import { useGetTaskByHouseholdIdQuery } from "../../Redux/Service/task/taskApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import SnackbarComponent from "../../component/snackbar/snackbarComponent";
import { snackbarContext } from "../../context/snackBarContext";
import { List, Surface } from "react-native-paper";
import ArchivedTaskCard from "../../component/taskFolder/ArchivedTaskCard";
import { ActivityIndicator, Colors } from "react-native-paper";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;
const deviceHeight = Math.round(Dimensions.get("window").height);

//[TODO] add event definitions to Props
// eslint-disable-next-line prettier/prettier
const TasksScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [render, setRender] = useState(false);
    const [tasks, setTasks] = useState<TaskNow[]>();
    const [archivedTasks, setArchivedTasks] = useState<TaskNow[]>();
    const [isClickedTaskOpen, setIsClickedTaskOpen] = useState(false);
    const [taskInModal, setTaskInModal] = useState<TaskNow>();
    const [rights, setRights] = useState(false);
    const user = useAppSelector(selectCurrentLoginUser);
    const { message, isVisible } = useContext(snackbarContext);

    const {
        data: tasksData,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetTaskByHouseholdIdQuery(currentHousehold?.id!);
    const { data: doneTasksData, isLoading: doneTaskLoading } = useGetDoneTasksWithHouseholdIdQuery(
        currentHousehold?.id!,
    );
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
        const dateCompare = new Date(date._seconds * 1000);
        return dateCompare;
    };

    useEffect(() => {
        if (isLoading) {
            console.log("laddar");
        }
    }, [isLoading]);

    useEffect(() => {
        currentHousehold?.member.forEach((m) => {
            if (m.userId === user?.id && m.isOwner) {
                setRights(true);
            }
        });
    }, [rights]);

    useEffect(() => {
        const activeTasks: TaskNow[] = [];
        const inactiveTasks: TaskNow[] = [];
        tasksData?.forEach((t) => {
            const taskItem: TaskNow = {
                id: t.id as string,
                name: t.name,
                householdId: t.houseHoldId,
                description: t.description,
                repeated: t.repeated,
                archived: t.archived,
                value: t.value,
                createdAt: t.createdAt as Date,
                emojiList: [],
            };

            if (t.createdAt) {
                taskItem.createdAt = dateConvert(t.createdAt);
            }
            if (!taskItem.archived) {
                activeTasks.push(taskItem);
            } else {
                inactiveTasks.push(taskItem);
            }
            doneTasksData?.forEach((d) => {
                const today: boolean = isToday(d.dateDone);
                if (t.id === d.taskId) {
                    activeTasks[activeTasks.length - 1].dateDone = dateConvert(d.dateDone);
                    if (today) {
                        currentHousehold?.member.forEach((m) => {
                            if (d.userId === m.userId) {
                                activeTasks[activeTasks.length - 1].emojiList.push(m.emoji);
                            }
                        });
                    }
                }
                // else {
                //     activeTasks[activeTasks.length - 1].dateDone = dateConvert(d.dateDone);
                // }
            });
        });
        setTasks(activeTasks);
        setArchivedTasks(inactiveTasks);

        // if (activeTasks.length > 0) {
        setRender(true);
        // }
    }, [tasksData, doneTasksData]);

    const clickOnTask = (task: TaskNow) => {
        setTaskInModal(task);
        setIsClickedTaskOpen(true);
        console.log("click on task,", task);
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
            <SnackbarComponent isVisible={isVisible} message={message} />
            {isLoading && (
                <View style={{ marginTop: "50%" }}>
                    <ActivityIndicator animating={isLoading} color={Colors.tealA200} />
                </View>
            )}
            {render && (
                <ScrollView style={styles.listContainer}>
                    {/* <FlatList
                        data={tasks}
                        keyExtractor={(item: TaskNow) => item.id}
                        renderItem={({ item }) => (
                            <TaskCard key={item.id} task={item} onPress={() => clickOnTask(item)} />
                        )}
                    /> */}
                    {tasks?.map((item, index) => {
                        return <TaskCard key={index} task={item} onPress={() => clickOnTask(item)} />;
                    })}
                    {rights && archivedTasks && archivedTasks.length > 0 && (
                        <ArchivedTaskCard archivedTasks={archivedTasks} />
                    )}
                    <ModalComponent isOpen={addModalOpen} handleAddClose={handleAddClose} />
                    <TaskModal
                        isOpen={isClickedTaskOpen}
                        handleModalClose={handleTaskClose}
                        task={taskInModal as TaskNow}
                    />
                </ScrollView>
            )}
            <View style={rights ? styles.buttonsContainer : styles.buttonsContainerUser}>
                {rights && (
                    <Button
                        iconType={{ type: "MaterialIcons", icons: "add-circle-outline" }}
                        text="Lägg till"
                        onPress={handleAddClick}
                    ></Button>
                )}
                <Button
                    iconType={{ type: "MaterialIcons", icons: "person" }}
                    text="Medlemmar"
                    onPress={onPressUsersInHousehold}
                ></Button>
            </View>
        </View>
    );
};

export default TasksScreen;

const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
    item: {
        fontWeight: "bold",
        fontSize: 22,
        // marginHorizontal: 15,
        // marginVertical: 12,
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
    listContainer: {
        maxHeight: deviceHeight - 210,
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
    createdAt: Date;
}
