import { KnownAction } from "./taskAction";
import { TaskState, initialState } from "./taskState";

function bankReducer(state: TaskState = initialState, action: KnownAction): TaskState {
    switch (action.type) {
        
        default: return state;
    }
}

export default bankReducer;