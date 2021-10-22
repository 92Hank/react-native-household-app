import { RootState } from "../../store";

export const selectSelectedHousehold = (state: RootState) => state.SelectedState.SelectedHousehold;

export const selectSelectedTask = (state: RootState) => state.SelectedState.SelectedTask;
