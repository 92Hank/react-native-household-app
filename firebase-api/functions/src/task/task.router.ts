import * as express from "express";
import {
  postTask,
  getAllTaskOfHouseHold,
  editTask,
  deleteTask,
} from "./task.controller";

// eslint-disable-next-line new-cap
export const taskRouter = express.Router();

taskRouter.post("/tasks", postTask);
// taskRouter.get("/tasks/:id", getTask);
taskRouter.get("/tasks/:houseHoldId", getAllTaskOfHouseHold);
taskRouter.put("/tasks/:id", editTask);
taskRouter.delete("/tasks/:id", deleteTask);


