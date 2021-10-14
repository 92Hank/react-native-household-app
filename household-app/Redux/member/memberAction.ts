import member from "../../../Common/src/Entity/member";

interface AddMemberAction {
  type: "ADD_USER_ACTION";
  payload: member;
}

export type memberAction = AddMemberAction;
