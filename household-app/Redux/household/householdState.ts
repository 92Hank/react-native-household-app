import household from "../../../Common/src/Entity/household";

export interface householdState {
  households: household[];
}
export const initialUsersState: householdState = { households: [] };
