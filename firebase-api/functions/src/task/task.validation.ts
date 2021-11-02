/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable require-jsdoc */
import {Request, Response, NextFunction} from "express";

import {body, validationResult} from "express-validator";

function checkValidation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({errors: errors.array()});
  } else {
    next();
  }
}


export const postValidation = [
  body("description").notEmpty().isLength({min: 3, max: 120}),
  body("name").notEmpty().isLength({min: 3, max: 20}),
  body("value").isFloat({min: 1, max: 8}),
  body("houseHoldId").notEmpty().isLength({min: 3, max: 20}),
  body("repeated").notEmpty().isFloat(),
  body("archived").notEmpty().isBoolean(),
  checkValidation,
];

export const updateValidation = [
  body("description").notEmpty().isLength({min: 3, max: 120}),
  body("name").notEmpty().isLength({min: 3, max: 20}),
  body("value").isFloat({min: 1, max: 8}),
  body("houseHoldId").notEmpty().isLength({min: 3, max: 20}),
  body("repeated").notEmpty().isFloat(),
  checkValidation,
];

