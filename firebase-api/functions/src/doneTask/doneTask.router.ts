import * as express from "express";
import {postDoneTask, getAllDoneTaskOfHouseHold} from "./doneTask.controller";

// eslint-disable-next-line new-cap
export const doneTaskRouter = express.Router();

doneTaskRouter.post("/donetask", postDoneTask);
doneTaskRouter.get("/donetask/:houseHoldId", getAllDoneTaskOfHouseHold);
