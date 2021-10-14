import user from "../../../Common/src/Entity/user";

export interface UserState {
  users: user[];
}
export const initialUsersState: UserState = { users: [] };
