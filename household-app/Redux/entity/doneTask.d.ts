import { valueType } from "./value";

export default interface doneTask {
  id?: string;
  taskId: string;
  userId: string;
  value: valueType;
  dateDone: Date;
}
