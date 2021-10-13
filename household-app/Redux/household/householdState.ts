import household from "../../../Common/Entity/user";

export interface householdState {
  households: household[];
}
export const initialUsersState: householdState = { households: [] };
