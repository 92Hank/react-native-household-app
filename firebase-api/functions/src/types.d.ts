interface Task {
  description: string;
  value: 1 | 2 | 4 | 6 | 8;
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
  userId: string;
  emoji: string;
  isPaused: boolean;
  isOwner: boolean;
  value: number;
}

interface Household {
  name: string;
  ownerId?: string;
  member?: Member[];
  inviteCode: string;
}
