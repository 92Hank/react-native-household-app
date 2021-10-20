export default interface doneTask {
  id: string;
  taskId: string;
  memberId: number[];
  dateDone: Date;
  value?: number;
}
