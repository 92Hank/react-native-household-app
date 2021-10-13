import { UserAction } from "./userAction";
import { initialUsersState, UserState } from "./userState";

function userReducer(
  state: UserState = initialUsersState,
  action: UserAction
): UserState {
  switch (action.type) {
    default:
      return state;
  }
}

export default userReducer;
