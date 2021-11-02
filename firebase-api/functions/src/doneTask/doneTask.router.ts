import * as express from "express";
import {postDoneTask, getAllDoneTaskOfHouseHold} from "./doneTask.controller";
import {postValidation} from "./doneTask.validation";

// eslint-disable-next-line new-cap
export const doneTaskRouter = express.Router();

doneTaskRouter.post("/donetask", postValidation, postDoneTask);
doneTaskRouter.get("/donetask/:houseHoldId", getAllDoneTaskOfHouseHold);
