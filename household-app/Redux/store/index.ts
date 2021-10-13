import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./rootReducer";

const store = createStore(rootReducer);

/* Define our own custom hooks so we get strong typings */
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
