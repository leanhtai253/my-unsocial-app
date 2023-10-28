import request from 'supertest';
import app from '../../app';

it('Should return 422 if the email is not valid.', async () => {
  await request(app).post('/api/auth/signup').send({ email: 'oliver.legmail.com' }).expect(422);
});

it('Should return 201 if the email is valid.', async () => {
  await request(app).post('/api/auth/signup').send({ email: 'oliver.le@gmail.com' }).expect(201);
});
