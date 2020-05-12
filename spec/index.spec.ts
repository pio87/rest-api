import * as sinon from 'sinon';
import * as Hapi from '@hapi/hapi';
import * as registerJwtAuthStrategy from '../src/api/server/auth/jwt/registerJwtAuthStrategy';
import * as registerPlugins from '../src/api/server/plugins/registerPlugins';
import good from '../src/api/server/plugins/good';
import { init } from '../src';

class FakeServer extends Hapi.Server {}

suite('server init', () => {
  let server: any;

  setup(() => {
    server = sinon.createStubInstance(FakeServer);

    server.register = sinon.stub();
    server.auth = {
      strategy: sinon.stub(),
      default: sinon.stub()
    };

    server.route = sinon.stub();
    server.start = sinon.stub();
    server.stop = sinon.stub();
    server.subscription = sinon.stub();
  });

  test('Registers the JWT auth strategy', async () => {
    const registerClientAuthStrategySpy = sinon.spy(registerJwtAuthStrategy, 'registerJwtAuthStrategy');
    await init(server);

    sinon.assert.calledOnce(registerClientAuthStrategySpy);
  });

  test('Registers server plugins', async () => {
    const registerPluginsSpy = sinon.spy(registerPlugins, 'registerPlugins');

    await init(server);

    sinon.assert.calledOnce(registerPluginsSpy);
    sinon.assert.calledWith(registerPluginsSpy, server, [good]);
  });

  test('Starts a hapi server', async () => {
    await init(server);
    sinon.assert.calledOnce(server.start);
  });

  teardown(() => {
    sinon.restore();
  });
});
