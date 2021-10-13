import * as functions from "firebase-functions";
import * as express from "express";
import cors = require("cors");
import {userRouter} from "./user/user.router";

// initialize express server

const app = express();
app.use(cors({origin: true}));
app.use(express.json());
app.use(userRouter);

export const webApi = functions.https.onRequest(app);
