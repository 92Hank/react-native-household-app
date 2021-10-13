import task from "./task";
import user from "./user";

export default interface household {
  id: string;
  name: string;
  tasks: task[];
  member: user[];
  admin: user[];
}
