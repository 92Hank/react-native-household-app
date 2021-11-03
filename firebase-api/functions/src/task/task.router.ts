import * as express from "express";
import {
  postTask,
  getAllTaskOfHouseHold,
  editTask,
  deleteTask,
  archiveTask,
  activateTask,
} from "./task.controller";
import {postValidation, updateValidation} from "./task.validation";

// eslint-disable-next-line new-cap
export const taskRouter = express.Router();

taskRouter.post("/tasks", postValidation, postTask);
taskRouter.get("/tasks/:houseHoldId", getAllTaskOfHouseHold);
taskRouter.put("/tasks/:id", updateValidation, editTask);
taskRouter.patch("/tasks/:id", archiveTask);
taskRouter.delete("/tasks/:id", deleteTask);
taskRouter.patch("/tasks/activate/:id", activateTask);


