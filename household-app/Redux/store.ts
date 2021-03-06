import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import loginUserSliceReducer, { loginUserSlice } from "./features/loginUser/loginUserSlice";
import SelectedStateReducer, { SelectedStateSlice } from "./features/SelectedState/SelectedStateSlice";
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
        getDefaultMiddleware().concat(userApi.middleware).concat(householdApi.middleware).concat(taskApi.middleware),
});

// enable listener behavior for the store
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
