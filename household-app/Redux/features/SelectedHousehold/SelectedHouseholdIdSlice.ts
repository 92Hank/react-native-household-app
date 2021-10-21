import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedHouseholdState {
 HouseholdId?: string;
}

const initialState: SelectedHouseholdState = {};

export const SelectedHouseholdSlice = createSlice({
  name: "SelectedHousehold",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSelectedHouseholdId: (state, action: PayloadAction<string>) => {
      state.HouseholdId = action.payload;
      },
      removeSelectedHouseholdId: (state) => {
          state.HouseholdId = undefined
      }
  },
});

export const { setSelectedHouseholdId,removeSelectedHouseholdId } = SelectedHouseholdSlice.actions;

export default SelectedHouseholdSlice.reducer;