import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import household from "../../entity/household";
import task from "../../entity/task";
import { LoginAsync } from "../loginUser/loginUserSlice";
import { GetHouseholdById } from "./SelectedStateApi";

export interface SelectedState {
  SelectedHouseholdData: {
    SelectedHousehold?: household;
    status: "idle" | "loading" | "failed";
    message?: string;
  };
  SelectedTaskData: {
    SelectedTask?: task;
  };
}

const initialState: SelectedState = {
  SelectedHouseholdData: { status: "idle" },
  SelectedTaskData: {},
};

export const SetSelectedHouseholdByIdAsync = createAsyncThunk(
  "SelectedState/SetSelectedHousehold",
  async (id: string) => {
    const [Household, statusCode, status] = await GetHouseholdById(id);

    if (statusCode === 200 && Household) {
      return Household;
    } else {
      throw new Error(String(statusCode) + " " + status);
    }
  }
);

export const SelectedStateSlice = createSlice({
  name: "SelectedState",
  initialState,
  reducers: {
    setSelectedTask: (state, action: PayloadAction<task>) => {
      state.SelectedTaskData.SelectedTask = action.payload;
    },
    removeSelectedTask: (state) => {
      state.SelectedTaskData.SelectedTask = undefined;
    },
    removeSelectedHousehold: (state) => {
      state.SelectedHouseholdData = { status: "idle" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SetSelectedHouseholdByIdAsync.pending, (state) => {
        state.SelectedHouseholdData.message = undefined;
        state.SelectedHouseholdData.status = "loading";
      })
      .addCase(SetSelectedHouseholdByIdAsync.fulfilled, (state, action) => {
        state.SelectedHouseholdData.status = "idle";
        state.SelectedHouseholdData.SelectedHousehold = action.payload;
      })
      .addCase(SetSelectedHouseholdByIdAsync.rejected, (state, action) => {
        state.SelectedHouseholdData.status = "failed";
        state.SelectedHouseholdData.message = action.error.message;
      });
  },
});

export default SelectedStateSlice.reducer;
