import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Constants from "expo-constants";
import React from "react";
import { MainRoutes, MainStack } from "../routes/routes";
import HouseholdScreen from "../screens/Household/HouseholdScreen";

const Tab = createMaterialTopTabNavigator();
const statusBarHeight = Constants.statusBarHeight;

const HouseholdStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.HouseholdScreen}
            component={HouseholdScreen}
            options={{
                title: "",
                headerBackVisible: false,
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
        >
            <Tab.Screen name="Hushåll" component={HouseholdStack} />
        </Tab.Navigator>
    );
};

export default AppStack;
