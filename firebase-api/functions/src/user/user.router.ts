import * as express from "express";
import {post, getUser, getAllUsers} from "./user.controller";


// eslint-disable-next-line new-cap
export const userRouter = express.Router();


userRouter.post("/users", post);
userRouter.get("/users/:id", getUser);
userRouter.get("/users", getAllUsers);
