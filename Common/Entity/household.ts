import task from "./task";
import user from "./user";

export default interface household {
  id: string;
  name: string;
  code: number;
  tasks: task[];
  member: user[];
  admin: user[];
}
