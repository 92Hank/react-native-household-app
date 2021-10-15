import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import user from "./User";
import { CreateUser, fetchUsers } from "./UserApi";

export interface UserState {
  users: user[];
  status: "idle" | "loading" | "failed";
}
export const initialState: UserState = { users: [], status: "idle" };

export const getAllUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetchUsers();
  // The value we return becomes the `fulfilled` action payload
  return response.users;
});
export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: user) => {
    const response = await CreateUser(user);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<user>) {
      state.users.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      });
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
