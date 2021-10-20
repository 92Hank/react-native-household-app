import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Account/LoginScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import TasksScreen from "../screens/Tasks/TasksScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { MainRoutes, MainStack } from "../routes/routes";
import CreateAccountScreen from "../screens/Account/CreateAccount";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LastWeekScreen from "../screens/Tasks/LastWeekScreen";
import CurrentWeekScreen from "../screens/Tasks/CurrentWeekScreen";
import HouseholdScreen from "../screens/Household/HouseholdScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TaskScreenStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={"TasksScreen"}
      component={TasksScreen}
      options={{
        headerShown: false,
        title: "Today",
        headerTitleAlign: "center",
        headerTintColor: "grey",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  </Stack.Navigator>
);

const LastWeekStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={'LastWeekScreen'}
      component={LastWeekScreen}
      options={{
        headerShown: false,
        title: "Last Week",
        headerTitleAlign: "center",
        headerTintColor: "grey",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  </Stack.Navigator>
);

const LastMonthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={'CurrentWeekScreen'}
      component={CurrentWeekScreen}
      options={{
        headerShown: false,
        headerBackVisible: false,
        title: "Current Week",
        headerTitleAlign: "center",
        headerTintColor: "grey",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  </Stack.Navigator>
);

// const TasksStack = () => (
//   <MainStack.Navigator initialRouteName={MainRoutes.TasksScreen}>
//     <MainStack.Screen
//       name={MainRoutes.TasksScreen}
//       component={TasksScreen}
//       options={{
//         headerShown: false,
//         title: "Today",
//         headerTitleAlign: "center",
//         headerTintColor: "grey",
//         headerTitleStyle: {
//           fontWeight: "bold",
//         },
//       }}
//     />
//     <MainStack.Screen
//       name={MainRoutes.LastWeekScreen}
//       component={LastWeekScreen}
//       options={{
//         headerShown: false,
//         headerBackVisible: false,
//         title: "Last Week",
//         headerTitleAlign: "center",
//         headerTintColor: "grey",
//         headerTitleStyle: {
//           fontWeight: "bold",
//         },
//       }}
//     />
//     <MainStack.Screen
//       name={MainRoutes.CurrentWeekScreen}
//       component={CurrentWeekScreen}
//       options={{
//         headerShown: false,
//         headerBackVisible: false,
//         title: "Current Week",
//         headerTitleAlign: "center",
//         headerTintColor: "grey",
//         headerTitleStyle: {
//           fontWeight: "bold",
//         },
//       }}
//     />
//   </MainStack.Navigator>
// );

const TaskStack = () => {
  return (
    <Stack.Screen name="TaskStack">
      {(props) => (
        <Tab.Navigator
          initialRouteName="Today"
          screenOptions={{
            tabBarIndicatorStyle: { backgroundColor: "white" },
            tabBarLabelStyle: { fontWeight: "bold" },
          }}
          // screenOptions={{lazy: true, tabBarStyle: {marginTop: insets.top}}}
        >
          {/* <Tab.Screen name="Sign in" component={LoginStack} />
      <Tab.Screen name="Sign up" component={CreateStack} /> */}
          <Tab.Screen name="Last Week" component={LastWeekStack} />
          <Tab.Screen
            name="Today"
            component={TaskScreenStack}
            initialParams={props.route.params}
          />
          <Tab.Screen name="Current Week" component={LastMonthStack} />
        </Tab.Navigator>
      )}
    </Stack.Screen>
  );
};
export default TaskStack;
