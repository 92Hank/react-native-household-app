import { RootState } from "../../store";

export const selectSelectedHouseholdId = (state: RootState) =>
  state.SelectedHousehold.HouseholdId;
