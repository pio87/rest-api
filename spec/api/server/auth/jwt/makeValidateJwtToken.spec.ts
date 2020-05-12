import * as sinon from 'sinon';
import * as chai from 'chai';
import { makeValidateJwtToken } from '../../../../../src/api/server/auth/jwt/makeValidateJwtToken';

suite('makeValidateJwtToken', () => {
  let fakeDb: any;
  const user = { email: 'test@test.com' };

  setup(() => {
    fakeDb = {
      User: {
        findByEmail: sinon.stub().returns(user)
      }
    };
  });

  test('Tries to find user by email in database', async () => {
    await makeValidateJwtToken(fakeDb)(user);

    sinon.assert.calledOnce(fakeDb.User.findByEmail);
  });

  test('Returns isValid = false if user is not found in database', async () => {
    fakeDb.User.findByEmail.returns(null);

    const validate = makeValidateJwtToken(fakeDb);

    const result = await validate(user);

    chai.assert.deepEqual(result, {
      isValid: false,
      credentials: {
        user: {}
      }
    });
  });

  test('Returns isValid = true if a user is found', async () => {
    const result = await makeValidateJwtToken(fakeDb)(user);

    chai.assert.deepEqual(result, {
      isValid: true,
      credentials: { user: { email: 'test@test.com' } }
    });
  });

  teardown(() => {
    sinon.restore();
  });
});
