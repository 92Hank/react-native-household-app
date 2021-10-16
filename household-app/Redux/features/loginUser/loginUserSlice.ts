import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import user from "../../Service/user/User";
import { loginSend } from "./loginSend";
import { LogIn } from "./loginUserApi";

export interface loginUserState {
  user?: user;
  status: "idle" | "loading" | "failed";
  message?: string;
}

const initialState: loginUserState = {
  status: "idle",
};

export const LoginAsync = createAsyncThunk(
  "counter/fetchCount",
  async ({ userName, password }: loginSend) => {
    const response = await LogIn(userName, password);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      state.user = undefined;
      state.message = undefined;
      state.status = "idle";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(LoginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(LoginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export const { logout } = loginUserSlice.actions;

export default loginUserSlice.reducer;
