import * as express from "express";
import {
  createUser,
  getUser,
  getAllUsers,
  signInUser,
} from "./user.controller";

import {createUserValidation, signinValidation} from "./user.validation";


// eslint-disable-next-line new-cap
export const userRouter = express.Router();


userRouter.post("/users", createUserValidation, createUser);
userRouter.get("/users/:id", getUser);
userRouter.get("/users", getAllUsers);
userRouter.post("/users/signin", signinValidation, signInUser);

