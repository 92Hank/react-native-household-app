/* eslint-disable max-len */
import * as express from "express";
import {
  post,
  //   getHousehold,
  changeNameOnHouseHold,
  getHouseholdsOnInviteCode,
  acceptMember,
  getUsersHouseholdsOnUserId,
  joinHousehold,
  makeMemberAdmin,
  setMemberOnPauseHouseHold,
  memberLeaveHouseHold,
  memberChangeName,
  memberChangeEmoji,
  rejectMember,
  getHousehold,
} from "./household.controller";

// eslint-disable-next-line new-cap
export const householdRouter = express.Router();

householdRouter.post("/household", post);
householdRouter.get("/household/:id", getHousehold);
householdRouter.get("/household/userId/:userId", getUsersHouseholdsOnUserId);
householdRouter.get(
    "/household/invitecode/:inviteCode",
    getHouseholdsOnInviteCode
);

householdRouter.post("/household/join", joinHousehold);
householdRouter.patch("/household/accept", acceptMember);
householdRouter.patch("/household/owner", makeMemberAdmin);
householdRouter.patch("/household/changename", changeNameOnHouseHold);
householdRouter.patch("/household/setpaused", setMemberOnPauseHouseHold);
householdRouter.patch("/household/changenameOnMember", memberChangeName);
householdRouter.patch("/household/changeemoji", memberChangeEmoji);
householdRouter.patch("/household/reject", rejectMember);
householdRouter.delete("/household/leave", memberLeaveHouseHold);


