import * as Hapi from '@hapi/hapi';
import createServer from './api/server/createServer';
import { env } from './config/env';
import logger from './utils/logger/logger';
import { registerJwtAuthStrategy } from './api/server/auth/jwt/registerJwtAuthStrategy';
import authRoutes from './api/modules/auth/authRoutes';
import cryptoRoutes from './api/modules/crypto/cryptoRoutes';
import { registerPlugins } from './api/server/plugins/registerPlugins';
import good from './api/server/plugins/good';

logger.info('Instantiating server...');
export const server = env.AUTOSTART ? createServer(Hapi.Server) : ({} as any);
logger.info('Server instantiated!');

export async function init(server: Hapi.Server) {
  logger.info('Starting API server...');

  logger.info('Registering server plugins...');
  await registerPlugins(server, [good]);
  logger.info('Server plugins registered!');

  logger.info('Registering auth strategies...');
  await registerJwtAuthStrategy(server);
  logger.info('Auth strategies registered!');

  logger.info('Registering server routes...');
  server.route([...authRoutes(), ...cryptoRoutes()]);
  logger.info('Server routes registered!');

  logger.info('Starting the server...');
  await server.start();
  logger.info('Server started!');

  logger.info('System is operational, good to go!');
}

if (env.AUTOSTART) {
  init(server);
}
