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
import {
  postValidation,
  joinValidation,
  acceptAndLeaveAndMakeOwnerValidation,
  changeNameOnHouseholdValidation,
  setPasuedValidation,
  memberChangeNameValidation,
  changeMemberNameValidation,
} from "./household.validation";
// eslint-disable-next-line new-cap
export const householdRouter = express.Router();

householdRouter.post("/household", postValidation, post);
householdRouter.get("/household/:id", getHousehold);
householdRouter.get("/household/userId/:userId", getUsersHouseholdsOnUserId);
householdRouter.get(
    "/household/invitecode/:inviteCode",
    getHouseholdsOnInviteCode
);

householdRouter.post("/household/join", joinValidation, joinHousehold);
householdRouter.patch(
    "/household/accept",
    acceptAndLeaveAndMakeOwnerValidation,
    acceptMember
);
householdRouter.patch(
    "/household/owner",
    acceptAndLeaveAndMakeOwnerValidation,
    makeMemberAdmin
);
householdRouter.patch(
    "/household/changename",
    changeNameOnHouseholdValidation,
    changeNameOnHouseHold
);
householdRouter.patch(
    "/household/setpaused",
    setPasuedValidation,
    setMemberOnPauseHouseHold
);
householdRouter.patch(
    "/household/changenameOnMember",
    memberChangeNameValidation,
    memberChangeName
);
householdRouter.patch(
    "/household/changeemoji",
    changeMemberNameValidation,
    memberChangeEmoji
);
householdRouter.patch(
    "/household/reject",
    acceptAndLeaveAndMakeOwnerValidation,
    rejectMember
);
householdRouter.delete(
    "/household/leave",
    acceptAndLeaveAndMakeOwnerValidation,
    memberLeaveHouseHold
);


