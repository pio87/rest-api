import * as sinon from 'sinon';
import * as chai from 'chai';
import { signIn } from '../../../../../../src/api/modules/auth/handlers/signIn/signIn';
import { env } from '../../../../../../src/config/env';

suite('signIn', () => {
  let fakeDb: any;
  let fakeJwtSign: any;

  const request = {
    payload: {
      email: 'test@TEST.com',
      password: 'secret'
    }
  };

  setup(() => {
    fakeJwtSign = sinon.stub();
    fakeDb = {
      User: {
        findByEmail: sinon.stub(),
        create: sinon.stub().returns({})
      }
    };
  });

  test('Searches for user in database', async () => {
    await signIn(fakeDb, fakeJwtSign)(request);

    sinon.assert.calledOnce(fakeDb.User.findByEmail);
    sinon.assert.calledWith(fakeDb.User.findByEmail, request.payload.email.toLowerCase());
  });

  test('Throws 400 Bad Request if user is already registered', async () => {
    fakeDb.User.findByEmail.returns({});

    let error: any = null;
    try {
      await signIn(fakeDb, fakeJwtSign)(request);
    } catch (e) {
      error = e;
    }

    chai.assert.notEqual(error, null);
    chai.assert.equal(error.message, 'already_registered');
    chai.assert.equal(error.output.statusCode, 400);
  });

  test('Creates user in database', async () => {
    await signIn(fakeDb, fakeJwtSign)(request);

    sinon.assert.calledOnce(fakeDb.User.create);
    sinon.assert.calledWith(fakeDb.User.create, {
      email: request.payload.email.toLowerCase(),
      password: request.payload.password,
      pubKey: null
    });
  });

  test('Creates user in database', async () => {
    await signIn(fakeDb, fakeJwtSign)(request);

    sinon.assert.calledOnce(fakeDb.User.create);
    sinon.assert.calledWith(fakeDb.User.create, {
      email: request.payload.email.toLowerCase(),
      password: request.payload.password,
      pubKey: null
    });
  });

  test('Creates JWT and returns it as json payload', async () => {
    fakeJwtSign.returns('fake jwt');

    fakeDb.User.create.returns({ email: 'test@test.com' });

    const result = await signIn(fakeDb, fakeJwtSign)(request);

    sinon.assert.calledOnce(fakeJwtSign);
    sinon.assert.calledWith(fakeJwtSign, { email: fakeDb.User.create.firstCall.returnValue.email }, env.JWT_SECRET);

    chai.assert.deepStrictEqual(result, {
      authToken: fakeJwtSign.firstCall.returnValue
    });
  });

  teardown(() => {
    sinon.restore();
  });
});
