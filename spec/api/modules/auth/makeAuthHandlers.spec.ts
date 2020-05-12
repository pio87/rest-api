import * as sinon from 'sinon';
import * as signIn from '../../../../src/api/modules/auth/handlers/signIn/signIn';
import makeAuthHandlers from '../../../../src/api/modules/auth/makeAuthHandlers';

suite('makeAuthHandlers', () => {
  test('Creates an object with callbacks with properly injected deps', () => {
    const fakeDb: any = {};
    const fakeJWTSign: any = sinon.stub();
    const signInSpy = sinon.spy(signIn, 'signIn');

    makeAuthHandlers(fakeDb, fakeJWTSign);

    sinon.assert.calledWith(signInSpy, fakeDb, fakeJWTSign);
  });
});
