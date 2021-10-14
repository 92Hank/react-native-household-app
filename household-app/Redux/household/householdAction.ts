import household from "../../../Common/src/Entity/household";

interface AddHouseholdAction {
  type: "ADD_USER_ACTION";
  payload: household;
}

export type HouseholdAction = AddHouseholdAction;
