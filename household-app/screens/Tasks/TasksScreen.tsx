import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import ModalComponent from "../../component/modal/ModalComponent";
import TaskCard from "../../component/taskFolder/TaksCard";
import { useAppSelector } from "../../Redux/hooks";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useGetTaskByHouseholdIdQuery } from "../../Redux/Service/task/taskApi";
import task from "../../Redux/entity/task";
import { useGetDoneTasksWithHouseholdIdQuery } from "../../Redux/Service/doneTask/doneTaskApi";
import doneTask from "../../Redux/entity/doneTask";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;
let tasksNow: TaskNow[] = [];



const TasksScreen: FC<Props> = ({
  navigation,
  event,
}: Props): React.ReactElement => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const currentHousehold = useAppSelector(selectSelectedHousehold);
  const [render, setRender] = useState(false);
  const [tasks, setTasks] = useState(tasksNow);

  // if (!currentHousehold) {
  //   navigation.navigate(MainRoutes.HouseholdScreen);
  //   return <View></View>;
  // }

  const { data, isLoading, isFetching, isError, error } =
    useGetTaskByHouseholdIdQuery(currentHousehold?.id!);

  const doneTasksData = useGetDoneTasksWithHouseholdIdQuery(
    currentHousehold?.id!
  ).data;

  const isToday = (someDate: any): boolean => {
    const today = new Date();
    const value = new Date(someDate._seconds * 1000);
    return (
      value.getDate() == today.getDate() &&
      value.getMonth() == today.getMonth() &&
      value.getFullYear() == today.getFullYear()
    );
  };
  console.log("TASK", data);
  console.log("DONE TASK", doneTasksData);
  // const test2 = useGetDoneTaskByHouseholdIdQuery(currentHousehold.id).isLoading
  // const test3 = useGetDoneTaskByHouseholdIdQuery(currentHousehold.id).isFetching
  // const test4 = useGetDoneTaskByHouseholdIdQuery(currentHousehold.id).isError
  // const test5 = useGetDoneTaskByHouseholdIdQuery(currentHousehold.id).error

  // console.log(data);

    // useEffect(() => {
    //   data?.forEach((element) => {
    //     console.log(element);
    //     tasksNow.push(element);
    //   });
    // }, [data]);

  // useEffect(() => {
  //   data?.forEach((t) => {
  //     doneTasksData?.forEach((d) => {
  //       console.log("NU ÄR VI HÄR")
  //       if (t.id === d.taskId) {
  //         console.log("taskID");
  //         currentHousehold?.member.forEach((m) => {
  //             if (d.userId === m.userId) {
  //               console.log("bajs");
  //               console.log(m.emoji);
  //             }
  //           });
  //         });
  //       }
  //     });
  //   });
  // }, [data, doneTasksData]);

  useEffect(() => {
    data?.forEach((t) => {
      let taskItem: TaskNow = {
        id: t.id as string,
        householdId: t.houseHoldId,
        description: t.description,
        repeated: t.repeated,
        archived: t.archived,
        value: t.value,
        emojiList: [],
      };
      doneTasksData?.forEach((d) => {
        const today: boolean = isToday(d.dateDone)
        if (t.id === d.taskId && today) {
          currentHousehold?.member.forEach((m) => {
            if (d.userId === m.userId) {

              if(tasks.find((x => x.id == t.id))) {
                return;
              } else {
                tasksNow = []
                taskItem.emojiList.push(m.emoji);
                tasksNow.push(taskItem);
                setTasks(tasksNow);
              }
            }
          });
        }
      });
    });
    if (tasksNow.length > 0) {
      setRender(true);
    }
  }, [data, doneTasksData]);

  const clickOnTask = () => {
    console.log("click on task,");
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
        <View>
          <FlatList
            data={tasks}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
              <TaskCard key={item.id} task={item} onPress={clickOnTask} />
            )}
          />
          <ModalComponent
            isOpen={addModalOpen}
            handleAddClose={handleAddClose}
            event={event}
          />
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={handleAddClick}
          style={styles.householdButton}
        >
          <MaterialIcons name="add-circle-outline" size={30} color="black" />
          <Text style={styles.householdButtonText}>Skapa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressUsersInHousehold}
          style={styles.householdButton}
        >
          <Feather name="edit-2" size={30} color="black" />
          <Text style={styles.householdButtonText}>Medlemmar</Text>
        </TouchableOpacity>
      </View>
    </View>
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

// let tasks: Task[] = [
//   { description: "foo", value: 1, id: "abc" },
//   { description: "foo2", value: 2, id: "abc2" },
// ];

// let emojiList: string[] = ["🦊", "🐷", "🐸"];

// create this list from our data with useEffect or something
// let tasksNow: TaskNow[] = [
//   {
//     householdId: "abs3",
//     description: "foo",
//     value: 1,
//     id: "abc2",
//     repeated: 2,
//     archived: false,
//     emojiList: emojiList,
//   },
//   {
//     householdId: "abs4",
//     description: "foo 2",
//     value: 1,
//     id: "abc",
//     repeated: 2,
//     archived: false,
//     emojiList: emojiList,
//   },
// ];

interface TaskNow {
  id: string;
  householdId?: string;
  description?: string;
  repeated?: number;
  archived?: boolean;
  value?: number;
  emojiList: number[];
}
