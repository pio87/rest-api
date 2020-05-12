import * as sinon from 'sinon';
import * as HapiAuthJwt from 'hapi-auth-jwt2';
import * as Hapi from '@hapi/hapi';
import { registerJwtAuthStrategy } from '../../../../../src/api/server/auth/jwt/registerJwtAuthStrategy';
import * as makeValidateJwtToken from '../../../../../src/api/server/auth/jwt/makeValidateJwtToken';
import { env } from '../../../../../src/config/env';

class FakeServer extends Hapi.Server {}

suite('registerJwtAuthStrategy', () => {
  test('Registers the auth strategy', async () => {
    const makeValidateJwtTokenSpy = sinon.stub(makeValidateJwtToken, 'makeValidateJwtToken').returns('spy' as any);

    const server: any = sinon.createStubInstance<any>(FakeServer);
    server.auth = {
      strategy: sinon.stub(),
      default: sinon.stub()
    };

    server.register = sinon.stub();

    await registerJwtAuthStrategy(server);

    sinon.assert.calledOnce(server.register);

    sinon.assert.calledWith(server.register, HapiAuthJwt);

    sinon.assert.calledOnce(makeValidateJwtTokenSpy);

    sinon.assert.calledOnce(server.auth.strategy);

    sinon.assert.calledWith(server.auth.strategy, 'jwt', 'jwt', {
      validate: makeValidateJwtTokenSpy.firstCall.returnValue,
      ttl: 300000, // hardcoded 5 minutes
      key: env.JWT_SECRET
    });

    sinon.assert.calledOnce(server.auth.default);
  });

  teardown(() => {
    sinon.restore();
  });
});
