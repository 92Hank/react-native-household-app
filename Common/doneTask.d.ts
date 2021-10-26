import { valueType } from "./value";

export declare interface doneTask {
    id?: string;
    taskId: string;
    userId: string;
    value: valueType;
    dateDone: Date;
}
