import { doneTaskAction } from "./doneTaskAction";
import { doneTaskState, initialDoneTasksState } from "./doneTaskState";

function doneTaskReducer(
  state: doneTaskState = initialDoneTasksState,
  action: doneTaskAction
): doneTaskState {
  switch (action.type) {
    default:
      return state;
  }
}

export default doneTaskReducer;
