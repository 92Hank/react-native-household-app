import { valueType } from "./value";

export declare interface doneTask {
    id?: string;
    taskId: string;
    memberId: string;
    value: valueType;
    dateDone: Date;
}
