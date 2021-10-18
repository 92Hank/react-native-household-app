import * as express from "express";
import {
  post,
  //   getHousehold,
  acceptMember,
  getUserHouseholds,
  joinHousehold,
  makeMemberAdmin,
} from "./household.controller";

// eslint-disable-next-line new-cap
export const householdRouter = express.Router();

householdRouter.post("/household", post);
// householdRouter.get("/household/:id", getHousehold);
householdRouter.get("/household/", getUserHouseholds);
householdRouter.post("/household/join", joinHousehold);
householdRouter.patch("/household/accept", acceptMember);
householdRouter.patch("/household/owner", makeMemberAdmin);

