import { TaskAction } from "./taskAction";
import { taskState, initialTasksState } from "./taskState";

function taskReducer(state: taskState = initialTasksState, action: TaskAction): taskState {
    switch (action.type) {
        
        default: return state;
    }
}

export default taskReducer;