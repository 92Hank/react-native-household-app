import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loginUserSliceReducer, {
  loginUserSlice,
} from "./features/loginUser/loginUserSlice";
import { userApi } from "./Service/user/userApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [loginUserSlice.name]: loginUserSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
