import React from "react";
import TasksScreen from "../screens/Tasks/tasksScreen/TasksScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MainRoutes, MainStack } from "../routes/routes";
import LastWeekScreen from "../screens/Tasks/lastWeekScreen/LastWeekScreen";
import LastMonthScreen from "../screens/Tasks/lastMonthScreen/LastMonthScreen";
import CurrentWeekScreen from "../screens/Tasks/currentWeekScreen/CurrentWeekScreen";

const Tab = createMaterialTopTabNavigator();
const TaskScreenStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.TasksScreen}
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

const CurrentWeekStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.CurrentWeekScreen}
            component={CurrentWeekScreen}
            options={{
                headerShown: false,
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

const LastMonthStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.LastMonthScreen}
            component={LastMonthScreen}
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

const TaskStack = () => {
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
            <Tab.Screen name="Idag" component={TaskScreenStack} />
            <Tab.Screen name="Denna vecka" component={CurrentWeekStack} />
            <Tab.Screen name="Förra veckan" component={LastWeekStack} />
            <Tab.Screen name="Förra månaden" component={LastMonthStack} />
        </Tab.Navigator>
    );
};
export default TaskStack;
