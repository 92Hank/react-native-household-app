import * as functions from "firebase-functions";
import * as express from "express";
import cors = require("cors");
import {userRouter} from "./user/user.router";
import {householdRouter} from "./household/household.router";

// initialize express server

const app = express();
app.use(cors({origin: true}));
app.use(express.json());
app.use(userRouter);
app.use(householdRouter);

export const webApi = functions.https.onRequest(app);
