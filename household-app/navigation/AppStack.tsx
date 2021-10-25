import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Account/LoginScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import TasksScreen from "../screens/Tasks/TasksScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MainRoutes, MainStack } from "../routes/routes";
import CreateAccountScreen from "../screens/Account/CreateAccount";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LastWeekScreen from "../screens/Tasks/LastWeekScreen";
import LastMonthScreen from "../screens/Tasks/LastMonthScreen";
import HouseholdScreen from "../screens/Household/HouseholdScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const LoginStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.LoginScreen}
            component={LoginScreen}
            options={{
                // headerShown: false,
                title: "Login",
                headerTitleAlign: "center",
                headerTintColor: "grey",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                // headerRight: () => (
                //   <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                // ),
            }}
        />
    </MainStack.Navigator>
);

const HouseholdStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.HouseholdScreen}
            component={HouseholdScreen}
            options={{
                // headerShown: false,
                title: "Households",
                headerTitleAlign: "center",
                headerTintColor: "grey",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerBackVisible: false,
                // headerRight: () => (
                //   <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                // ),
            }}
        />
    </MainStack.Navigator>
);

const CreateStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.CreateAccountScreen}
            component={CreateAccountScreen}
            options={{
                // headerShown: false,
                title: "Create your account",
                headerTitleAlign: "center",
                headerTintColor: "grey",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        />
    </MainStack.Navigator>
);

const ProfileStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.ProfileScreen}
            component={ProfileScreen}
            options={{
                // headerShown: false,
                title: "Your profile",
                headerTitleAlign: "center",
                headerTintColor: "grey",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerBackVisible: false,
            }}
        />
    </MainStack.Navigator>
);

const TasksStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.TasksScreen}
            component={TasksScreen}
            options={{
                // headerShown: false,
                title: "Your Tasks",
                headerTitleAlign: "center",
                headerTintColor: "grey",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        />
        <MainStack.Screen
            name={MainRoutes.LastWeekScreen}
            component={LastWeekScreen}
            options={{
                // headerShown: false,
                headerBackVisible: false,
                title: "Last Week",
                headerTitleAlign: "center",
                headerTintColor: "grey",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        />
        <MainStack.Screen
            name={MainRoutes.CurrentWeekScreen}
            component={CurrentWeekScreen}
            options={{
                // headerShown: false,
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

const AppStack = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: "white" },
                tabBarLabelStyle: { fontWeight: "bold" },
            }}
            // screenOptions={{lazy: true, tabBarStyle: {marginTop: insets.top}}}
        >
            <Tab.Screen name="Households" component={HouseholdStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
    );
};

export default AppStack;
