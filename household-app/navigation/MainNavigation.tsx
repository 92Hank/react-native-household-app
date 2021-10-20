import React from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { MainRoutes } from "../routes/routes";
import AppStack from "./AppStack";
import { Appbar, Switch, TouchableRipple, useTheme } from "react-native-paper";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { View } from "react-native";
import TaskStack from "./TaskStack";
import AuthStack from "./AuthStack";
import UsersStack from "./UsersStack";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {

  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={"LoginScreen"}
          component={AuthStack}
          options={{ title: "", headerBackVisible: false }}
        />
        <Stack.Screen
          name={"HouseholdScreen"}
          component={AppStack}
          options={{ title: "", headerBackVisible: false }}
        />
        <Stack.Screen
          name={"TasksScreen"}
          component={TaskStack}
          options={{
            title: "Tasks",
            headerTitleStyle: { fontSize: 24 },
          }}
        />
        <Stack.Screen
          name={"UsersInHouseHoldScreen"}
          component={UsersStack}
          options={{
            title: "Users",
            headerTitleStyle: { fontSize: 24 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
