export default interface task {
  id?: string;
  householdId: number;
  description: string;
  repeated: number;
  archived: boolean;
  value: 1 | 2 | 4 | 6 | 8;
}
