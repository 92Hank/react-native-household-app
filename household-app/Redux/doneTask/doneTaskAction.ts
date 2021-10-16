import doneTask from "../../../Common/src/Entity/doneTask";

interface AddDoneTaskAction {
  type: "ADD_TASK_ACTION";
  payload: doneTask;
}

export type doneTaskAction = AddDoneTaskAction;
