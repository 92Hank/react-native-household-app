import household from "./household";
import user from "./user";

export default interface member {
  id: string;
  household: household;
  user: user;
  emoji: any;
  role: "Admin" | "User";
  paused: boolean;
}
