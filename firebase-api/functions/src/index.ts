import * as functions from "firebase-functions";
import * as express from "express";
import cors = require("cors");
import {userRouter} from "./user/user.router";
import {taskRouter} from "./task/task.router";
import {householdRouter} from "./household/household.router";
import {memberRouter} from "./member/member.router";


// initialize express server

const app = express();
app.use(cors({origin: true}));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(householdRouter);
app.use(memberRouter);


export const webApi = functions.https.onRequest(app);
