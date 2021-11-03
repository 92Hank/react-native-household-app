import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { MainRoutes, MainStack } from "../routes/routes";
import HouseholdProfile from "../screens/Household/HouseholdProfile";
import UsersInHouseHoldScreen from "../screens/Tasks/usersInHousehold/UsersInHouseHoldScreen";

const Tab = createMaterialTopTabNavigator();

const UserStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.UsersInHouseHoldScreen}
            component={UsersInHouseHoldScreen}
            options={{
                title: "Medlemmar",
                headerShown: false,
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

const MemberProfileStack = () => (
    <MainStack.Navigator>
        <MainStack.Screen
            name={MainRoutes.HouseholdProfile}
            component={HouseholdProfile}
            options={{
                title: "Profil",
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

const UsersStack = () => {
    return (
        <Tab.Navigator
            initialRouteName="Today"
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: "white" },
                tabBarLabelStyle: { fontWeight: "bold" },
            }}
        >
            <Tab.Screen name="Medlemmar i hushåll" component={UserStack} />
            <Tab.Screen name="Profil" component={MemberProfileStack} />
        </Tab.Navigator>
    );
};
export default UsersStack;
