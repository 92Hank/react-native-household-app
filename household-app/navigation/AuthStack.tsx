import React from "react";
import LoginScreen from "../screens/Account/LoginScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MainRoutes, MainStack } from "../routes/routes";
import CreateAccountScreen from "../screens/Account/CreateAccount";
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
            // screenOptions={{lazy: true, tabBarStyle: {marginTop: insets.top}}}
        >
            {/* <Tab.Screen name="Sign in" component={LoginStack} />
      <Tab.Screen name="Sign up" component={CreateStack} /> */}
            <Tab.Screen name="Logga in" component={LoginStack} />
            <Tab.Screen name="Skapa konto" component={CreateStack} />
        </Tab.Navigator>
    );
};
export default AuthStack;
