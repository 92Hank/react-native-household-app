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

export const createUserValidation = [
  body("userName").notEmpty(),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isLength({min: 6}),
  checkValidation,
];

export const signinValidation = [
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isLength({min: 6}),
  checkValidation,
];

