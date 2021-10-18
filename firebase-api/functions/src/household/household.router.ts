/* eslint-disable max-len */
import * as express from "express";
import {
  post,
  //   getHousehold,
  getHouseholdsOnInviteCode,
  acceptMember,
  getUsersHouseholdsOnUserId,
  joinHousehold,
  makeMemberAdmin,
} from "./household.controller";

// eslint-disable-next-line new-cap
export const householdRouter = express.Router();

householdRouter.post("/household", post);
// householdRouter.get("/household/:id", getHousehold);
householdRouter.get("/household/:userId", getUsersHouseholdsOnUserId);
householdRouter.get(
    "/household/invitecode/:inviteCode",
    getHouseholdsOnInviteCode
);

householdRouter.post("/household/join", joinHousehold);
householdRouter.patch("/household/accept", acceptMember);
householdRouter.patch("/household/owner", makeMemberAdmin);

