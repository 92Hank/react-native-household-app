import Task  from "../../../Common/Entity/task";

interface AddTaskAction {
  type: "ADD_TASK_ACTION";
  payload: Task;
}

export type TaskAction = AddTaskAction;
