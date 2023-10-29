import request from 'supertest';
import app from '../../app';
import {SIGN_UP_ROUTE} from "../route-defs";

/**
 * Test validity of email input
 */

describe('Test validity of email input', () => {
  const password = 'Admin@132';
  it('Should return 422 if the email is not valid.', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'oliver.legmail.com',
        password: password
      })
      .expect(422);
  });
});

/**
 * Email sanitization:
 * - Does not contain upper-case letter in the domain.
 */

describe('Test sanitization of email input', () => {
  const normalizedEmail = "oliver.le@hotmail.com";
  it('Should not contain upper-case letter(s) in the domain', async () => {
    const response = await request(app)
        .post(SIGN_UP_ROUTE)
        .send({
          email: 'oliver.le@HOTMAIL.COM',
          password: 'Admin@123'
        })
        .expect(201);
    expect(response.body.email).toEqual(normalizedEmail);
  })
})

/**
 * Valid password conditions:
 * - At least 8 characters
 * - At most 32 characters
 * - One lower-case letter
 * - One upper-case letter
 * - One number
 */
describe('Test validity of password input', () => {
  let email = '';

  beforeAll(() => {
    email = 'oliver.le@gmail.com';
  });

  it('Should return 422 if password is less than 8 characters.', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        email,
        password: 'Admin1'
      })
      .expect(422);
  });

  it('Should return 422 if password does not have at least a lower-case letter', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        email,
        password: 'Admin123456789012345678901234567890'
      })
      .expect(422);
  });

  it('Should return 422 if password does not have at least an upper-case letter', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        email,
        password: 'admin@123'
      })
      .expect(422);
  });

  it('Should return 422 if password does not have at least one number', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        email,
        password: 'Admin@Minda'
      })
      .expect(422);
  });
});

/**
 * Available methods to sign up route:
 * - POST
 */

describe('Test validity of method to the sign up route', () => {
  let sampleData = {};
  let baseUrl = '';

  beforeAll(() => {
    sampleData = {
      email: 'oliver.le@gmail.com',
      password: 'Admin@123'
    };
    baseUrl = '/api/auth/signup';
  });

  it('Should return 201 for POST method with valid input to the sign up route', async () => {
    await request(app).post(baseUrl).send(sampleData).expect(201);
  });

  it('Should return 200 and POST and OPTIONS as the allowed methods when calling OPTIONS method to the sign up route', async () => {
    const response = await request(app).options(baseUrl).expect(200);
    expect(response.get('access-control-allow-methods')).toContain('POST');
    expect(response.get('access-control-allow-methods')).toContain('OPTIONS');
  });

  it('Should return 405 for non-POST methods to the sign up route', async () => {
    await request(app).get(baseUrl).expect(405);
    await request(app).put(baseUrl).send(sampleData).expect(405);
    await request(app).delete(baseUrl).expect(405);
    await request(app).patch(baseUrl).expect(405);
  });
});

