import { memberAction } from "./memberAction";
import { initialMembersState, membersState } from "./memberState";

function memberReducer(
  state: membersState = initialMembersState,
  action: memberAction
): membersState {
  switch (action.type) {
    default:
      return state;
  }
}

export default memberReducer;
