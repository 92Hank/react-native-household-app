import { createNativeStackNavigator,
  NativeStackScreenProps as Props, } from '@react-navigation/native-stack'

export enum MainRoutes {
    LoginScreen = 'LoginScreen',
    CreateAccountScreen = 'CreateAccountScreen',
    ProfileScreen = 'ProfileScreen',
    TasksScreen = 'TasksScreen',
}

export type MainStackParamList = {
    [MainRoutes.LoginScreen]: undefined
    [MainRoutes.CreateAccountScreen]: undefined
    [MainRoutes.ProfileScreen]: undefined
    [MainRoutes.TasksScreen]: undefined
}

type ScreenName = keyof MainStackParamList;

export type FeedStackScreenProps<Screen extends ScreenName> = Props<
  MainStackParamList,
  Screen
>;

export const MainStack = createNativeStackNavigator<MainStackParamList>()