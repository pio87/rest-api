import * as Hapi from '@hapi/hapi';
import { env } from '../../config/env';

const createServer = (HapiServer: typeof Hapi.Server) => {
  const {
    SERVER: { PORT, HOST }
  } = env;

  return new HapiServer({
    port: PORT,
    host: HOST,
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Cookie', 'Content-Type', 'Accept', 'If-None-Match'],
        maxAge: 60,
        credentials: true
      }
    }
  });
};

export default createServer;
