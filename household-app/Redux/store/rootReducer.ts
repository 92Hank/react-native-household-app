import { combineReducers } from "redux";
import doneTaskReducer from "../doneTask/doneTaskReducer";
import householdReducer from "../household/householdReducer";
import taskReducer from "../task/taskReducer";
import userReducer from "../user/userReducer";

export const rootReducer = combineReducers({
  taskState: taskReducer,
  userState: userReducer,
  householdState: householdReducer,
  doneTaskState: doneTaskReducer,
});
