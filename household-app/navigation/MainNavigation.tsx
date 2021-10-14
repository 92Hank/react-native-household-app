import React from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainRoutes } from "../routes/routes";
import AppStack from "./AppStack";
import { Appbar, Switch, TouchableRipple, useTheme } from "react-native-paper";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { View } from "react-native";
import TaskStack from "./TaskStack";

const Stack = createNativeStackNavigator();

const MainNavigation = (): React.ReactElement => {

  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={MainRoutes.ProfileScreen}
          component={AppStack}
          options={{ title: "", headerBackVisible: false }}
        />
        <Stack.Screen
          name={MainRoutes.TasksScreen}
          component={TaskStack}
          options={{
            title: "Tasks",
            headerTitleStyle: { fontSize: 24 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
