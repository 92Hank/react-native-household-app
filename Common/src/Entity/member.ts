import household from "./household";
import user from "./user";

export default interface member {
  id: string;
  householdId: string;
  userId: string;
  emoji: "🦊" | "🐷" | "🐸" | "🐥" | "🐙" | "🐬" | "🦉" | "🦄";
  role: "Admin" | "User";
  paused: boolean;
}
