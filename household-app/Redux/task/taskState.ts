import task from "../../../Common/src/Entity/task";

export interface taskState {
  Tasks: task[];
}
export const initialTasksState: taskState = { Tasks: [] };
