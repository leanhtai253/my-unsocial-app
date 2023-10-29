import express from 'express';
import { json } from 'body-parser';
import { signUpRouter } from './routes';

const app = express();

app.use(json());

app.use(signUpRouter);

app.get('*', (req, res) => {
  res.status(200).send({});
});

export default app;
