import { combineReducers } from "redux";
import doneTaskReducer from "../doneTask/doneTaskReducer";
import householdReducer from "../household/householdReducer";
import memberReducer from "../member/memberReducer";
import taskReducer from "../task/taskReducer";
import userReducer from "../user/userReducer";

export const rootReducer = combineReducers({
  taskState: taskReducer,
  userState: userReducer,
  memberState: memberReducer,
  householdState: householdReducer,
  doneTaskState: doneTaskReducer,
});
