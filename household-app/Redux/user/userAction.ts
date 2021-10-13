import user from "../../../Common/Entity/user";

interface AddUserAction {
  type: "ADD_USER_ACTION";
  payload: user;
}

export type UserAction = AddUserAction;
