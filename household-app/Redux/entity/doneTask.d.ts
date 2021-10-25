import { valueType } from "./value";

export default interface doneTask {
    id?: string;
    taskId: string;
    memberId: string;
    value: valueType;
}
