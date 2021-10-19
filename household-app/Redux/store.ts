import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loginUserSliceReducer, {
  loginUserSlice,
} from "./features/loginUser/loginUserSlice";
import { householdApi } from "./Service/household/householdApi";
import { userApi } from "./Service/user/userApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [loginUserSlice.name]: loginUserSliceReducer,
    [householdApi.reducerPath]: householdApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(householdApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
