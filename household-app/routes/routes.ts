import { createNativeStackNavigator,
  NativeStackScreenProps as Props, } from '@react-navigation/native-stack'

export enum MainRoutes {
    LoginScreen = 'LoginScreen',
    CreateAccountScreen = 'CreateAccountScreen',
    ProfileScreen = 'ProfileScreen',
    TasksScreen = 'TasksScreen',
    LastWeekScreen = 'LastWeekScreen',
    CurrentWeekScreen = 'CurrentWeekScreen',
    HouseholdScreen = 'HouseholdScreen'
}

export type MainStackParamList = {
    [MainRoutes.LoginScreen]: undefined
    [MainRoutes.CreateAccountScreen]: undefined
    [MainRoutes.ProfileScreen]: undefined
    [MainRoutes.TasksScreen]: undefined
    [MainRoutes.LastWeekScreen]: undefined
    [MainRoutes.CurrentWeekScreen]: undefined
    [MainRoutes.HouseholdScreen]: undefined
}

type ScreenName = keyof MainStackParamList;

export type FeedStackScreenProps<Screen extends ScreenName> = Props<
  MainStackParamList,
  Screen
>;

export const MainStack = createNativeStackNavigator<MainStackParamList>()