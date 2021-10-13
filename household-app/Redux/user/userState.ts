import user from "../../../Common/Entity/user";

export interface UserState {
  users: user[];
}
export const initialUsersState: UserState = { users: [] };
