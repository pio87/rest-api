import * as sinon from 'sinon';
import * as chai from 'chai';
import { encrypt } from '../../../../../../src/api/modules/crypto/handlers/encrypt/encrypt';

suite('encrypt', () => {
  let fakeDb: any;
  let fakeRequest: any;
  let fakeResponse: any;
  let fakeNodeRsa: any;

  const request = {
    auth: {
      credentials: {
        user: {
          email: 'test@TEST.com',
          password: 'secret',
          pubKey: 'public key'
        }
      }
    }
  };

  setup(() => {
    fakeResponse = {
      response: sinon.stub().returns({
        header: sinon.stub()
      })
    };
    fakeRequest = {
      get: sinon.stub().returns('pdf contents')
    };
    fakeNodeRsa = sinon.stub().returns({
      encrypt: sinon.stub().returns('encrypted content')
    });
    fakeDb = {
      User: {
        update: sinon.stub()
      }
    };
  });

  test('Throws 422 error if public key if not yet generated for the user', async () => {
    let error: any = null;
    try {
      await encrypt(
        fakeDb,
        fakeRequest,
        fakeNodeRsa
      )(
        {
          auth: {
            credentials: {
              user: {
                pubKey: null
              }
            }
          }
        },
        fakeResponse
      );
    } catch (e) {
      error = e;
    }

    chai.assert.notEqual(error, null);
    chai.assert.equal(error.message, 'public_key_not_generated');
    chai.assert.equal(error.output.statusCode, 422);
  });

  test('Gets the contents of sample pdf file', async () => {
    await encrypt(fakeDb, fakeRequest, fakeNodeRsa)(request, fakeResponse);

    sinon.assert.calledOnce(fakeRequest.get);
    sinon.assert.calledWith(fakeRequest.get, 'http://www.africau.edu/images/default/sample.pdf');
  });

  test('Encrypts pdf file contents with user public key', async () => {
    await encrypt(fakeDb, fakeRequest, fakeNodeRsa)(request, fakeResponse);

    sinon.assert.calledOnce(fakeNodeRsa);
    sinon.assert.calledWith(fakeNodeRsa, request.auth.credentials.user.pubKey);

    sinon.assert.calledOnce(fakeNodeRsa().encrypt);
    sinon.assert.calledWith(fakeNodeRsa().encrypt, fakeRequest.get.firstCall.returnValue, 'base64');
  });

  test('Endpoint responses with encrypted content and sets content-type header', async () => {
    await encrypt(fakeDb, fakeRequest, fakeNodeRsa)(request, fakeResponse);

    sinon.assert.calledOnce(fakeResponse.response);
    sinon.assert.calledWith(fakeResponse.response, fakeNodeRsa().encrypt.firstCall.returnValue);

    sinon.assert.calledOnce(fakeResponse.response().header);
    sinon.assert.calledWith(fakeResponse.response().header, 'content-type', 'text/plain');
  });

  teardown(() => {
    sinon.restore();
  });
});
