import User from '../UserModel';

it('Should not save user whose email already exists in the db', async () => {
  const sampleUser = {
    email: 'oliver.le@gmail.com',
    password: 'Admin@123'
  };
  const newUser = await User.create(sampleUser);
  expect(newUser).toBeDefined();

  let err;

  try {
    await User.create(sampleUser);
  } catch (e) {
    err = e;
  }

  expect(err).toBeDefined();
});
