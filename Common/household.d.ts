export declare  interface household {
    id: string;
    name: string;
    ownerId: string;
    member: fullMemberInfo[];
    inviteCode: string;
    userIds: string[];
}
export declare interface fullMemberInfo {
    name: string;
    userId: string;
    emoji: number;
    isPaused: boolean;
    isOwner: boolean;
    AcceptedStatus: "accepted" | "pending" | "rejected";
}

export declare interface householdCreate {
    ownerId: string;
    member: memberSend;
    name: string;
}

export declare interface householdJoin {
    houseHoldId: string;
    inviteCode: number;
    member: memberSend;
}
export declare interface householdChangeName {
    houseHoldId: string;
    name: string;
}

export declare interface householdMemberChangeName {
  houseHoldId: string;
  userId: string;
  name: string;
}

export declare interface householdIdAndUserId {
    houseHoldId: string;
    userId: string;
}
export declare interface householdPauseUser {
    houseHoldId: string;
    userId: string;
    isPaused: boolean;
}

export declare interface householdChangeEmoji {
    houseHoldId: string;
    userId: string;
    emoji: number;
}

export declare interface memberSend {
    id?: string;
    userId: string;
    emoji: number;
    name: string;
}

export declare type emoji = "🦊" | "🐷" | "🐸" | "🐥" | "🐙" | "🐬" | "🦉" | "🦄";


