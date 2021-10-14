import { RootState } from "../store";

export const selectDoneTask = (state: RootState) => state.doneTaskState.DoneTask;
