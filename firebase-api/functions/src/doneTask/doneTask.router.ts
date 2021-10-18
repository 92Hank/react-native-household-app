import * as express from "express";
import {
  postDoneTask,
} from "./doneTask.controller";

// eslint-disable-next-line new-cap
export const doneTaskRouter = express.Router();

doneTaskRouter.post("/donetask", postDoneTask);

