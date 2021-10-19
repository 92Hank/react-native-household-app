export default interface household {
  id: string;
  name: string;
  ownerId: string;
  member: fullMemberInfo[];
  inviteCode: string;
  userIds: string[];
}
interface fullMemberInfo {
  name: string;
  userId: string;
  emoji: number;
  isPaused: boolean;
  isOwner: boolean;
  AcceptedStatus: "accepted"|"pending"|"rejected";
}


export interface householdCreate {
  houseHoldId: string;
  ownerId: string;
  member: memberSend;
}

export interface householdJoin {
  houseHoldId: string;
  inviteCode: number;
  member: memberSend;
}

export interface householdAcceptOrMakeOwner {
  houseHoldId: string;
  userId: string;
}


export interface memberSend {
  id: string;
  userId: string;
  emoji:number;
}
