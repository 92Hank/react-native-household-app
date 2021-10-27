import * as express from "express";
import {
  postTask,
  getAllTaskOfHouseHold,
  editTask,
  deleteTask,
  archiveTask,
  activateTask,
} from "./task.controller";

// eslint-disable-next-line new-cap
export const taskRouter = express.Router();

taskRouter.post("/tasks", postTask);
// taskRouter.get("/tasks/:id", getTask);
taskRouter.get("/tasks/:houseHoldId", getAllTaskOfHouseHold);
taskRouter.put("/tasks/:id", editTask);
taskRouter.patch("/tasks/:id", archiveTask);
taskRouter.delete("/tasks/:id", deleteTask);
taskRouter.patch("/tasks/activate/:id", activateTask);


