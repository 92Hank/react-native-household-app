import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loginUserSliceReducer, {
  loginUserSlice,
} from "./features/loginUser/loginUserSlice";
import SelectedHouseholdIdReducer, { SelectedHouseholdSlice } from "./features/SelectedHousehold/SelectedHouseholdIdSlice";
import { householdApi } from "./Service/household/householdApi";
import { taskApi } from "./Service/task/taskApi";
import { userApi } from "./Service/user/userApi";

export const store = configureStore({
  reducer: {
    [loginUserSlice.name]: loginUserSliceReducer,
    [SelectedHouseholdSlice.name]: SelectedHouseholdIdReducer,
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
