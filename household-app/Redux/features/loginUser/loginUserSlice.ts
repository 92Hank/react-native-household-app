import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import user from "../../entity/User";
import { loginSend } from "../../entity/loginSend";
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
  "loginUser/LoginAsync",
  async ({ email, password }: loginSend) => {
    const [user, statusCode, status] = await LogIn(email, password);

    if (statusCode === 200 && user) {
      console.log("fulfill", statusCode, user);

      return user;
    } else {
      console.log("rejectWithValue", status);
      throw new Error(String(statusCode) + " " + status);
    }
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
