import { combineReducers } from "redux";
import taskReducer from "../task/taskReducer";
import userReducer from "../user/userReducer";

export const rootReducer = combineReducers({
    task: taskReducer,
    user: userReducer,
});
