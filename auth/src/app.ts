import express from 'express';
import { json } from 'body-parser';
import routes from './routes';

const app = express();

const { signUpRouter } = routes;

app.use(json());

app.use(signUpRouter);

app.get('*', (req, res) => {
  res.status(200).send({});
});

export default app;
