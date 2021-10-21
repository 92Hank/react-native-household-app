import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loginUserSliceReducer, {
  loginUserSlice,
} from "./features/loginUser/loginUserSlice";
import SelectedStateReducer, {
  SelectedStateSlice,
} from "./features/SelectedState/SelectedSrateSlice";
import { householdApi } from "./Service/household/householdApi";
import { taskApi } from "./Service/task/taskApi";
import { userApi } from "./Service/user/userApi";

export const store = configureStore({
  reducer: {
    [loginUserSlice.name]: loginUserSliceReducer,
    [SelectedStateSlice.name]: SelectedStateReducer,
    [userApi.reducerPath]: userApi.reducer,
    [householdApi.reducerPath]: householdApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(householdApi.middleware)
      .concat(taskApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
