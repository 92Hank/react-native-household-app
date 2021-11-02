/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC, useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import Button from "../../../component/common/Button";
import SnackbarComponent from "../../../component/snackbar/snackbarComponent";
import ArchivedTaskCard from "../../../component/taskFolder/ArchivedTaskCard";
import TaskCard from "../../../component/taskFolder/TaskCard";
import ModalComponent from "../../../component/taskModal/addTaskModal/addTaskModal";
import TaskModal from "../../../component/taskModal/taskModal";
import { snackbarContext } from "../../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import {
    useLazyGetDoneTasksWithHouseholdIdQuery,
    useLazyGetTaskByHouseholdIdQuery,
} from "../../../Redux/Service/task/taskApi";
import { FeedStackScreenProps, MainRoutes } from "../../../routes/routes";
import styles from "./styles";

type Props = FeedStackScreenProps<MainRoutes.TasksScreen>;

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
    const { message, isVisible, setSnackbar } = useContext(snackbarContext);

    const [loadHouseholdData, householdResult] = useLazyGetTaskByHouseholdIdQuery();
    const { data: tasksData, isLoading } = householdResult;

    const [loadDoneTaskData, doneTaskResult] = useLazyGetDoneTasksWithHouseholdIdQuery();
    const { data: doneTasksData } = doneTaskResult;

    useEffect(() => {
        if (!user || !currentHousehold) return;
        loadHouseholdData(currentHousehold.id);
        loadDoneTaskData(currentHousehold.id);
    }, []);

    if (!user || !currentHousehold) return <View></View>;

    // const { data: tasksData, isLoading } = useGetTaskByHouseholdIdQuery(currentHousehold?.id!);
    // const { data: doneTasksData } = useGetDoneTasksWithHouseholdIdQuery(currentHousehold?.id!);

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
        const member = currentHousehold.member.filter((m) => m.userId === user.id);
        if (member[0].isPaused) {
            setSnackbar("Din användare är pausad", true);
            return;
        }
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
                    iconType={{ type: "MaterialIcons", icons: "home" }}
                    text="Ditt hushåll"
                    onPress={onPressUsersInHousehold}
                ></Button>
            </View>
        </View>
    );
};

export default TasksScreen;

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
