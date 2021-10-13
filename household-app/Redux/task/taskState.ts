import Task from "../../../Common/Entity/task";

export interface TaskState {
  Tasks: Task[];
}
export const initialTasksState: TaskState = { Tasks: [] };
