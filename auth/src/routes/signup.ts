import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const app = express();

const validators = [body('email').isEmail().withMessage('Invalid email format.')];

const signUpRouter = app.post('/api/auth/signup', validators, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    res.status(201).send();
  } else {
    res.status(422).send();
  }
});
export default signUpRouter;
