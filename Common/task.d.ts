import { valueType } from "./value";

export default interface task {
    id?: string;
    description: string;
    value: valueType;
    houseHoldId: string;
    repeated: number;
    archived: false;
    name: string;
}
