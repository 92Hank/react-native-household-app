import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { MainRoutes, MainStack } from "../routes/routes";
import UsersInHouseHoldScreen from "../screens/Tasks/UsersInHouseHoldScreen";
import HouseholdProfile from "../screens/Household/HouseholdProfile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const UserStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={'UsersInHouseHoldScreen'}
      component={UsersInHouseHoldScreen}
      options={{
        // headerShown: false,
        title: "Medlemmar",
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
  </Stack.Navigator>
);

const MemberProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={'HouseholdProfile'}
      component={HouseholdProfile}
      options={{
        // headerShown: false,
        title: "Profil",
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
  </Stack.Navigator>
);

const UsersStack = () => {
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
      <Tab.Screen name="Medlemmar i hushåll" component={UserStack} />
      <Tab.Screen name="Profil" component={MemberProfileStack} />
    </Tab.Navigator>
  );
};
export default UsersStack;
