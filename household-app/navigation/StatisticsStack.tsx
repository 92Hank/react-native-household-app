import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MainRoutes, MainStack } from "../routes/routes";
// import StatisticsScreen from "../screens/Statistics/test";
import StatisticsScreen from "../screens/Statistics/StatisticsScreen";
import CurrentWeekScreen from "../screens/Tasks/CurrentWeekScreen";
import LastWeekScreen from "../screens/Tasks/LastWeekScreen";
import TasksScreen from "../screens/Tasks/TasksScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TaskScreenStack = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name={MainRoutes.StatisticsScreen}
      component={StatisticsScreen}
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
  </MainStack.Navigator>
);

const LastWeekStack = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name={MainRoutes.LastWeekScreen}
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
  </MainStack.Navigator>
);

const LastMonthStack = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name={MainRoutes.CurrentWeekScreen}
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
  </MainStack.Navigator>
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

const StatisticsStack = () => {
  return (
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
      <Tab.Screen name="Today" component={TaskScreenStack} />
      <Tab.Screen name="Current Week" component={LastMonthStack} />
    </Tab.Navigator>
  );
};
export default StatisticsStack;
