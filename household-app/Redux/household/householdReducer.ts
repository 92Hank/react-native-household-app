import { HouseholdAction } from "./householdAction";
import { initialUsersState, householdState } from "./householdState";

function householdReducer(
  state: householdState = initialUsersState,
  action: HouseholdAction
): householdState {
  switch (action.type) {
    default:
      return state;
  }
}

export default householdReducer;
