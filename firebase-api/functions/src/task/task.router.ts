import * as express from "express";
import {postTask, getTask, getAllTask} from "./task.controller";

// eslint-disable-next-line new-cap
export const taskRouter = express.Router();

taskRouter.post("/tasks", postTask);
taskRouter.get("/tasks/:id", getTask);
taskRouter.get("/tasks", getAllTask);
