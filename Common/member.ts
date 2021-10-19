export default interface member {
  id: string;
  householdId: string;
  userId: string;
  emoji: emoji;
  role: "Admin" | "User";
  paused: boolean;
}

export type emoji = "🦊" | "🐷" | "🐸" | "🐥" | "🐙" | "🐬" | "🦉" | "🦄";