import member from "../../../Common/src/Entity/member";

export interface membersState {
  members: member[];
}
export const initialMembersState: membersState = { members: [] };
