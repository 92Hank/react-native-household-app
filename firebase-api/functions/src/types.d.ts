interface Task {
  id?: string;
  houseHoldId: string;
  name: string;
  description: string;
  value: 1 | 2 | 4 | 6 | 8;
  repeated: number;
  archived: boolean;
  createdAt?: Date;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  isOwner: boolean;
}

interface CreateUser {
  userName: string;
  email: string;
  password: string;
}


interface Member {
  id?: string;
  name: string;
  userId: string;
  emoji: number;
  isPaused: boolean;
  isOwner: boolean;
  AcceptedStatus: "accepted" | "pending" | "rejected";
}

interface Household {
  name: string;
  ownerId?: string;
  member?: Member[];
  inviteCode: string;
  userIds: string[];
}

interface DoneTask {
  id?: string;
  taskId: string;
  userId: string;
  houseHoldId: string;
  dateDone: Date;
  value: number;
}
