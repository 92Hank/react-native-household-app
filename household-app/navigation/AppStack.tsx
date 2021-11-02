import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MainRoutes, MainStack } from "../routes/routes";
import HouseholdScreen from "../screens/Household/HouseholdScreen";
import Constants from "expo-constants";

const Tab = createMaterialTopTabNavigator();
const statusBarHeight = Constants.statusBarHeight;

const HouseholdStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.HouseholdScreen}
            component={HouseholdScreen}
            options={{
                // headerShown: false,
                title: "",
                // headerTitleAlign: "center",
                // headerTintColor: "grey",
                // headerTitleStyle: {
                //     fontWeight: "bold",
                // },
                headerBackVisible: false,
                // headerRight: () => (
                //   <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                // ),
            }}
        />
    </MainStack.Navigator>
);

const AppStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: "white" },
                tabBarLabelStyle: { fontWeight: "bold" },
                tabBarStyle: { marginTop: statusBarHeight },
            }}
            // screenOptions={{lazy: true, tabBarStyle: {marginTop: insets.top}}}
        >
            <Tab.Screen name="Hushåll" component={HouseholdStack} />
        </Tab.Navigator>
    );
};

export default AppStack;
