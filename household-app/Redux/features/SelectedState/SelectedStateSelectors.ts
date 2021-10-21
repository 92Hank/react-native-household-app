import { RootState } from "../../store";

export const selectedHouseholdData = (state: RootState) =>
  state.SelectedState.SelectedHouseholdData;

export const selectedTask = (state: RootState) =>
  state.SelectedState.SelectedTaskData.SelectedTask;
