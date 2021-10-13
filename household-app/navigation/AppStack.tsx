import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreacteAccountScreen from "../screens/Account/CreateAccount";
import LoginScreen from "../screens/Account/LoginScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import TasksScreen from "../screens/Tasks/TasksScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MainRoutes, MainStack } from '../routes/routes';



const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen
        name="CreacteAccountScreen"
        component={CreacteAccountScreen}
      />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      <Tab.Screen name="TasksScreen" component={TasksScreen} />
    </Tab.Navigator>
  );
};

export default AppStack;