import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Constants from "expo-constants";
import React from "react";
import { MainRoutes, MainStack } from "../routes/routes";
import CreateAccountScreen from "../screens/Account/CreateAccount";
import LoginScreen from "../screens/Account/LoginScreen";

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
            }}
        />
        <MainStack.Screen
            name={MainRoutes.CreateAccountScreen}
            component={CreateAccountScreen}
            options={{
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

const CreateStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.CreateAccountScreen}
            component={CreateAccountScreen}
            options={{
                headerShown: false,
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
        >
            <Tab.Screen name="Logga in" component={LoginStack} />
            <Tab.Screen name="Skapa konto" component={CreateStack} />
        </Tab.Navigator>
    );
};
export default AuthStack;
