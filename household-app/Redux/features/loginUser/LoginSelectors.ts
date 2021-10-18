import { RootState } from "../../store";

export const selectCurrentLoginUser = (state: RootState) =>
  state.loginUser.user;
