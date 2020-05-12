import * as sinon from 'sinon';
import { generateKeyPair } from '../../../../../../src/api/modules/crypto/handlers/generateKeyPair/generateKeyPair';

suite('generateKeyPair', () => {
  let fakeDb: any;
  let fakeNodeRsa: any;

  const request = {
    auth: {
      credentials: {
        user: {
          email: 'test@TEST.com',
          password: 'secret',
          pubKey: null
        }
      }
    }
  };

  setup(() => {
    fakeNodeRsa = sinon.stub().returns({
      exportKey: sinon.stub().onCall(0).returns('firstCall').onCall(1).returns('secondCall')
    });
    fakeDb = {
      User: {
        update: sinon.stub()
      }
    };
  });

  test('Creates key pair and exports it', async () => {
    await generateKeyPair(fakeDb, fakeNodeRsa)(request);

    sinon.assert.calledOnce(fakeNodeRsa);
    sinon.assert.calledWith(fakeNodeRsa, { b: 1024 });

    sinon.assert.calledTwice(fakeNodeRsa().exportKey);
    sinon.assert.calledWith(fakeNodeRsa().exportKey, 'private');
    sinon.assert.calledWith(fakeNodeRsa().exportKey, 'public');
  });

  test('Updates authorized user with new public key', async () => {
    await generateKeyPair(fakeDb, fakeNodeRsa)(request);

    sinon.assert.calledOnce(fakeDb.User.update);
    sinon.assert.calledWith(fakeDb.User.update, request.auth.credentials.user.email, {
      pubKey: fakeNodeRsa().exportKey.firstCall.returnValue
    });
  });

  teardown(() => {
    sinon.restore();
  });
});
