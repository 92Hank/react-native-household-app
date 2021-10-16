import * as express from "express";
import {
  createUser,
  getUser,
  getAllUsers,
  signInUser,
} from "./user.controller";


// eslint-disable-next-line new-cap
export const userRouter = express.Router();


userRouter.post("/users", createUser);
userRouter.get("/users/:id", getUser);
userRouter.get("/users", getAllUsers);
userRouter.post("/users/signin", signInUser);

