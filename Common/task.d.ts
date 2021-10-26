import { valueType } from "./value";

export declare interface task {
    id?: string;
    description: string;
    value: valueType;
    houseHoldId: string;
    repeated: number;
    archived: false;
    name: string;
    createdAt?: Date;
}
