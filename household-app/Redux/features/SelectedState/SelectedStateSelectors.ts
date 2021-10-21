import { RootState } from "../../store";

export const selectSelectedHousehold = (state: RootState) =>
  state.SelectedState.SelectedHousehold;
