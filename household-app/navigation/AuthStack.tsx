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
import CurrentWeekScreen from "../screens/Tasks/CurrentWeekScreen";
import HouseholdScreen from "../screens/Household/HouseholdScreen";
import Constants from "expo-constants";

const Tab = createMaterialTopTabNavigator();
const statusBarHeight = Constants.statusBarHeight;

const LoginStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.LoginScreen}
            component={LoginScreen}
            options={{
                headerShown: false,
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

const AuthStack = () => {
    return (
        <Tab.Navigator
            initialRouteName="Today"
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: "white" },
                tabBarLabelStyle: { fontWeight: "bold" },
                tabBarStyle: { marginTop: statusBarHeight },
            }}
            // screenOptions={{lazy: true, tabBarStyle: {marginTop: insets.top}}}
        >
            {/* <Tab.Screen name="Sign in" component={LoginStack} />
      <Tab.Screen name="Sign up" component={CreateStack} /> */}
            <Tab.Screen name="Sign in" component={LoginStack} />
            <Tab.Screen name="Sign up" component={CreateStack} />
        </Tab.Navigator>
    );
};
export default AuthStack;
