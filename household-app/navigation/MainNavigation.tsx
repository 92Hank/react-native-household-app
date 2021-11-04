import React from "react";
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
import TaskStack from "./TaskStack";
import AuthStack from "./AuthStack";
import UsersStack from "./UsersStack";

const Stack = createNativeStackNavigator();

const MainNavigation = (): React.ReactElement => {
    const theme = useTheme();
    const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

    return (
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator>
                <Stack.Screen
                    name={MainRoutes.LoginScreen}
                    component={AuthStack}
                    options={{ title: "", headerBackVisible: false, headerShown: false }}
                />
                <Stack.Screen
                    name={MainRoutes.HouseholdScreen}
                    component={AppStack}
                    options={{ title: "", headerBackVisible: false, headerShown: false }}
                />
                <Stack.Screen
                    name={MainRoutes.TasksScreen}
                    component={TaskStack}
                    options={{
                        title: "Sysslor",
                        headerTitleStyle: { fontSize: 24 },
                        headerTitleAlign: "center",
                    }}
                />
                <Stack.Screen
                    name={MainRoutes.UsersInHouseHoldScreen}
                    component={UsersStack}
                    options={{
                        title: "",
                        headerTitleStyle: { fontSize: 24 },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigation;
