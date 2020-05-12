import * as sinon from 'sinon';
import * as Hapi from '@hapi/hapi';
import { registerPlugins } from '../../../../src/api/server/plugins/registerPlugins';

suite('registerPlugins', () => {
  test('registers all plugins passed in the server', async () => {
    const server: any = sinon.createStubInstance(Hapi.Server);

    const register = sinon.stub();

    const plugins = [
      {
        register
      },
      {
        register
      }
    ];

    await registerPlugins(server, plugins);

    sinon.assert.calledTwice(register);
  });

  teardown(() => {
    sinon.restore();
  });
});
