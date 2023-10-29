import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { SIGN_UP_ROUTE } from './route-defs';
import { handleMethodNotAllowed } from './utils';

const signUpRouter = express.Router();

/**
 * VALIDATORS:
 * - Email
 * - Password
 */

const validators = [
  body('email').isEmail().withMessage('Invalid email format.'),
  body('password').isLength({ max: 32 }).isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1
  })
];

// POST METHOD

signUpRouter.post(SIGN_UP_ROUTE, validators, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send();
  } else {
    res.status(201).send();
  }
});

// OPTIONS METHOD

signUpRouter.options(SIGN_UP_ROUTE, (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', ['POST', 'OPTIONS']);
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  res.send(200);
});

// NOT ALLOWED METHODS

signUpRouter.get(SIGN_UP_ROUTE, handleMethodNotAllowed);
signUpRouter.put(SIGN_UP_ROUTE, handleMethodNotAllowed);
signUpRouter.patch(SIGN_UP_ROUTE, handleMethodNotAllowed);
signUpRouter.delete(SIGN_UP_ROUTE, handleMethodNotAllowed);

// EXPORT

export default signUpRouter;
