import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { SIGN_UP_ROUTE } from './route-defs';
import { handleMethodNotAllowed } from './utils';
import { User } from '../models';
import { InvalidInput } from '../error/invalid-input';

const signUpRouter = express.Router();

/**
 * VALIDATORS:
 * - Email
 * - Password
 */

const validators = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format.')
    .normalizeEmail({ gmail_remove_dots: false }),
  body('password').trim().isLength({ min: 8, max: 32 }).escape().isStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1
  })
];

// POST METHOD

signUpRouter.post(SIGN_UP_ROUTE, validators, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new InvalidInput('Input does not satisfy validation criteria.');
  } else {
    const userToSave = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email: userToSave.email });

    if (existingUser) {
      return res.sendStatus(422);
    }

    const newUser = await User.create({ email: userToSave.email, password: userToSave.password });

    return res.status(201).send({ email: newUser.email });
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
