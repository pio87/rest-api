import * as sinon from 'sinon';
import makeCryptoHandlers from '../../../../src/api/modules/crypto/makeCryptoHandlers';
import * as encrypt from '../../../../src/api/modules/crypto/handlers/encrypt/encrypt';
import * as generateKeyPair from '../../../../src/api/modules/crypto/handlers/generateKeyPair/generateKeyPair';

suite('makeCryptoHandlers', () => {
  test('Creates an object with callbacks with properly injected deps', () => {
    const fakeDb: any = {};
    const fakeRequest: any = sinon.stub();
    const fakeNodeRsa: any = sinon.stub();
    const encryptSpy = sinon.spy(encrypt, 'encrypt');
    const generateKeyPairSpy = sinon.spy(generateKeyPair, 'generateKeyPair');

    makeCryptoHandlers(fakeDb, fakeRequest, fakeNodeRsa);

    sinon.assert.calledWith(encryptSpy, fakeDb, fakeRequest, fakeNodeRsa);
    sinon.assert.calledWith(generateKeyPairSpy, fakeDb, fakeNodeRsa);
  });
});
