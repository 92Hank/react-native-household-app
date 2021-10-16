import doneTask from "../../../Common/src/Entity/doneTask";

export interface doneTaskState {
  DoneTask: doneTask[];
}
export const initialDoneTasksState: doneTaskState = { DoneTask: [] };
