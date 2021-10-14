import task from "../../../Common/src/Entity/task";

interface AddTaskAction {
  type: "ADD_TASK_ACTION";
  payload: task;
}

export type TaskAction = AddTaskAction;
