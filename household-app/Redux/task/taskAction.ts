import { Task } from "../../../Common/Entity/Task";

interface AddTaskAction {
  type: "ADD_TASK_ACTION";
  payload: Task;
}

export type KnownAction = AddTaskAction;
