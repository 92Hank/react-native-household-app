import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { household } from "../../../../Common/household";
import { task } from "../../../../Common/task";

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
        },
        setSelectedTask: (state, action: PayloadAction<task>) => {
            state.SelectedTask = action.payload;
        },
        removeSelectedTask: (state) => {
            state.SelectedTask = undefined;
        },
    },
});

export const { setSelectedHousehold, removeSelectedHousehold } = SelectedStateSlice.actions;

export default SelectedStateSlice.reducer;
