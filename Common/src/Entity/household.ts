import task from "./Task";
import user from "./user";

export default interface household {
  id: string;
  name: string;
  JoinCode: number;
  tasks: task[];
  member: user[];
  admin: user[];
}
