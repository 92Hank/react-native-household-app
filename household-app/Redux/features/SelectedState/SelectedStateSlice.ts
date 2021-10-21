import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import household from "../../entity/household";
import task from "../../entity/task";

export interface SelectedState {
  SelectedHousehold?: household;
  SelectedTask?: task;
}

const initialState: SelectedState = {};

export const SelectedStateSlice = createSlice({
  name: "SelectedState",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSelectedHousehold: (state, action: PayloadAction<household>) => {
      state.SelectedHousehold = action.payload;
      },
      removeSelectedHousehold: (state) => {
          state.SelectedHousehold = undefined;
      }
  },
});

export const { setSelectedHousehold, removeSelectedHousehold } =
  SelectedStateSlice.actions;

export default SelectedStateSlice.reducer;