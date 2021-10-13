import { Task } from "../../../Common/Entity/Task";

export interface TaskState {
  Tasks: Task[];
}
export const initialState: TaskState = {Tasks:[]};
