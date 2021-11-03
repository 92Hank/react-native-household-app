import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
import { doneTask } from "../../Common/doneTask";
import { household } from "../../Common/household";
import { selectSelectedHousehold } from "../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../Redux/hooks";
import { useLazyGetDoneTasksWithHouseholdIdQuery } from "../Redux/Service/task/taskApi";
import { MainRoutes, MainStack } from "../routes/routes";
import CurrentWeekScreen from "../screens/Tasks/currentWeekScreen/CurrentWeekScreen";
import {
    getCalendarWeekDoneTasksByHousehold,
    getLastMonthDoneTasksByHousehold,
} from "../screens/Tasks/helpers/doneTaskHelper";
import LastMonthScreen from "../screens/Tasks/lastMonthScreen/LastMonthScreen";
import LastWeekScreen from "../screens/Tasks/lastWeekScreen/LastWeekScreen";
import TasksScreen from "../screens/Tasks/tasksScreen/TasksScreen";

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
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [loadDoneTaskData, doneTaskResult] = useLazyGetDoneTasksWithHouseholdIdQuery();
    const [printWeek, setPrintWeek] = useState(false);
    const [printLastWeek, setPrintLastWeek] = useState(false);
    const [printMonth, setPrintMonth] = useState(false);

    const { data: doneTasksArray } = doneTaskResult;
    let doneTasksOfLastMonth: doneTask[] = [];
    let doneTasksOfLastWeek: doneTask[] = [];
    let doneTasksOfCurrentWeek: doneTask[] = [];

    useEffect(() => {
        if (doneTasksArray && currentHousehold) {
            doneTasksOfLastMonth = getLastMonthDoneTasksByHousehold(
                doneTasksArray as doneTask[],
                currentHousehold as household,
            );
            doneTasksOfLastWeek = getCalendarWeekDoneTasksByHousehold(
                doneTasksArray as doneTask[],
                currentHousehold as household,
                1,
            );
            doneTasksOfCurrentWeek = getCalendarWeekDoneTasksByHousehold(
                doneTasksArray as doneTask[],
                currentHousehold as household,
                0,
            );
        }
    }, [doneTasksArray, currentHousehold]);

    useEffect(() => {
        if (doneTasksOfCurrentWeek.length > 0) {
            setPrintWeek(true);
        }
        if (doneTasksOfLastMonth.length > 0) {
            setPrintMonth(true);
        }
        if (doneTasksOfLastWeek.length > 0) {
            setPrintLastWeek(true);
        }
    }, [doneTasksOfLastMonth, doneTasksOfCurrentWeek, doneTasksOfLastWeek]);

    useEffect(() => {
        if (!currentHousehold) return;
        loadDoneTaskData(currentHousehold.id);
    }, [currentHousehold]);

    return (
        <Tab.Navigator
            initialRouteName="Today"
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: "white" },
                tabBarLabelStyle: { fontWeight: "bold" },
            }}
        >
            <Tab.Screen name="Idag" component={TaskScreenStack} />
            {printWeek && <Tab.Screen name="Denna vecka" component={CurrentWeekStack} />}
            {printLastWeek && <Tab.Screen name="Förra veckan" component={LastWeekStack} />}
            {printMonth && <Tab.Screen name="Förra månaden" component={LastMonthStack} />}
        </Tab.Navigator>
    );
};
export default TaskStack;
