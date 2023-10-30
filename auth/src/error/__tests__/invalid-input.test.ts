import InvalidInput, { InvalidInputConstructorParams } from '../invalid-input';

describe('Test the InvalidInput custom error class', () => {
  it('Should have status code 422', () => {
    const invalidInput = new InvalidInput();
    expect(invalidInput.getStatusCode()).toEqual(422);
  });

  it('Test serialization of error', () => {
    const errors: InvalidInputConstructorParams = [
      {
        type: 'field',
        value: 'Admin@Minda',
        msg: 'Invalid value',
        path: 'password',
        location: 'body'
      },
      {
        type: 'field',
        value: 'admin@123',
        msg: 'Invalid value',
        path: 'password',
        location: 'body'
      }
    ];
    const invalidInput = new InvalidInput(errors);
    const serializedErrors = invalidInput.serializeErrorOutput();

    expect(serializedErrors.errors).toHaveLength(1);

    const { fields = {} } = serializedErrors.errors[0];
    expect(Object.keys(fields)).toEqual(['password']);
    expect(fields.password).toHaveLength(2);
    expect(fields.password).toContain('Invalid value');
  });
});
