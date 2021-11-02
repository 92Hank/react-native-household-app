/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable require-jsdoc */
import {Request, Response, NextFunction} from "express";

import {check, body, validationResult} from "express-validator";

function checkValidation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({errors: errors.array()});
  } else {
    next();
  }
}

export const postValidation = [
  body("ownerId").notEmpty().isLength({min: 6}),
  body("name").notEmpty().isLength({min: 3, max: 20}),
  check("member.name").if(body("member")).exists().notEmpty(),
  check("member.userId").if(body("member")).exists().notEmpty(),
  check("member.emoji").if(body("member")).exists().notEmpty(),
  checkValidation,
];

export const joinValidation = [
  body("houseHoldId").notEmpty().isLength({min: 6}),
  body("inviteCode").notEmpty().isLength({min: 4, max: 4}),
  check("member.name").if(body("member")).exists().notEmpty(),
  check("member.userId").if(body("member")).exists().notEmpty(),
  check("member.emoji").if(body("member")).exists().notEmpty(),
  checkValidation,
];

export const acceptAndLeaveAndMakeOwnerValidation = [
  body("houseHoldId").notEmpty().isLength({min: 6}),
  body("userId").notEmpty().isLength({min: 6}),
  checkValidation,
];

export const changeNameOnHouseholdValidation = [
  body("houseHoldId").notEmpty().isLength({min: 6}),
  body("name").notEmpty().isLength({min: 3, max: 20}),
  checkValidation,
];

export const setPasuedValidation = [
  body("houseHoldId").notEmpty().isLength({min: 6}),
  body("userId").notEmpty().isLength({min: 6}),
  body("isPaused").notEmpty().isBoolean(),
  checkValidation,
];

export const memberChangeNameValidation = [
  body("houseHoldId").notEmpty().isLength({min: 6}),
  body("userId").notEmpty().isLength({min: 6}),
  body("name").notEmpty().isLength({min: 3, max: 20}),
  checkValidation,
];

export const changeMemberNameValidation = [
  body("houseHoldId").notEmpty().isLength({min: 6}),
  body("userId").notEmpty().isLength({min: 6}),
  body("emoji").notEmpty().isFloat(),
  checkValidation,
];

