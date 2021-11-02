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
  body("taskId").notEmpty().isLength({min: 6}),
  body("userId").notEmpty().isLength({min: 6}),
  body("houseHoldId").notEmpty().isLength({min: 6}),
  body("value").notEmpty().isFloat({min: 1, max: 8}),
  checkValidation,
];

