import * as express from "express";
import {
  post,
  //   getHousehold,
  getUserHouseholds,
  joinHousehold,
} from "./household.controller";

// eslint-disable-next-line new-cap
export const householdRouter = express.Router();

householdRouter.post("/household", post);
// householdRouter.get("/household/:id", getHousehold);
householdRouter.get("/household/", getUserHouseholds);
householdRouter.post("/household/join", joinHousehold);
