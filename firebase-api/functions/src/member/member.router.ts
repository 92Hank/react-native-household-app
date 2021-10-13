import * as express from "express";
import {postMember} from "./member.controller";

// eslint-disable-next-line new-cap
export const memberRouter = express.Router();

memberRouter.post("/member", postMember);
