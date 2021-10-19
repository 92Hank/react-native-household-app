import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import ModalComponent from "../../component/modal/ModalComponent";
import TaskCard from "../../component/taskFolder/TaksCard";



type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const TasksScreen: FC<Props> = ({ navigation, event }: Props): React.ReactElement => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  const clickOnTask = () => {
    console.log("click on task, now we will mark it as done?");
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
    console.log("open");

  };
  const handleAddClose = () => {
    console.log("close")
    setAddModalOpen(false);
  };

  const onPressUsersInHousehold = () => {
    navigation.navigate(MainRoutes.UsersInHouseholdScreen);
  };

  const onPressEditTasks = () => {
    console.log("navigate")
    // navigation.navigate(MainRoutes.UsersInHouseHoldScreen)
  };
 
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPressUsersInHousehold}
          style={styles.householdButton}
        >
          <MaterialIcons name="add-circle-outline" size={30} color="black" />
          <Text style={styles.householdButtonText}>Medlemmar</Text>
        </TouchableOpacity>
        <View>
          <FlatList
            data={tasksNow}
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
            <Text style={styles.householdButtonText}>Medlemmar</Text>
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

// let tasks: Task[] = [
//   { description: "foo", value: 1, id: "abc" },
//   { description: "foo2", value: 2, id: "abc2" },
// ];

let emojiList: string[] = ["🦊", "🐷", "🐸"];

// create this list from our data with useEffect or something
let tasksNow: TaskNow[] = [
  {
    householdId: "abs3",
    description: "foo",
    value: 1,
    id: "abc2",
    repeated: 2,
    archived: false,
    emojiList: emojiList,
  },
  {
    householdId: "abs4",
    description: "foo 2",
    value: 1,
    id: "abc",
    repeated: 2,
    archived: false,
    emojiList: emojiList,
  },
];



interface TaskNow {
  id?: string;
  householdId?: string;
  description?: string;
  repeated?: number;
  archived?: boolean;
  value?: 1 | 2 | 4 | 6 | 8;
  emojiList: string[];
}
