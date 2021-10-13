import { TaskAction } from "./taskAction";
import { TaskState, initialTasksState } from "./taskState";

function taskReducer(state: TaskState = initialTasksState, action: TaskAction): TaskState {
    switch (action.type) {
        
        default: return state;
    }
}

export default taskReducer;