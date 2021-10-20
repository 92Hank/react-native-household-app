import { createNativeStackNavigator,
  NativeStackScreenProps as Props, } from '@react-navigation/native-stack'
import household from '../Redux/entity/household';
import CreateAccountScreen from '../screens/Account/CreateAccount';
import LoginScreen from '../screens/Account/LoginScreen';

// export enum MainRoutes {
//   LoginScreen = "LoginScreen",
//   CreateAccountScreen = "CreateAccountScreen",
//   ProfileScreen = "ProfileScreen",
//   TasksScreen = "TasksScreen",
//   LastWeekScreen = "LastWeekScreen",
//   CurrentWeekScreen = "CurrentWeekScreen",
//   HouseholdScreen = "HouseholdScreen",
//   StatisticsScreen = "StatisticsScreen",
//   UsersInHouseHoldScreen = "UsersInHouseHoldScreen",
//   HouseholdProfile = "HouseholdProfile",
//   TaskStack = "TaskStack",
// }

// export type MainStackParamList = {
//     LoginScreen = "LoginScreen",
//   CreateAccountScreen = "CreateAccountScreen",
//   ProfileScreen = "ProfileScreen",
//   TasksScreen = "TasksScreen",
//   LastWeekScreen = "LastWeekScreen",
//   CurrentWeekScreen = "CurrentWeekScreen",
//   HouseholdScreen = "HouseholdScreen",
//   StatisticsScreen = "StatisticsScreen",
//   UsersInHouseHoldScreen = "UsersInHouseHoldScreen",
//   HouseholdProfile = "HouseholdProfile",
//   TaskStack = "TaskStack",
// }

// type ScreenName = keyof MainStackParamList;

// export type FeedStackScreenProps<Screen extends ScreenName> = Props<
//   MainStackParamList,
//   Screen
// >;

// export const MainStack = createNativeStackNavigator<MainStackParamList>()