import * as Hapi from '@hapi/hapi';
import * as Good from '@hapi/good';
import GoodWinston from 'hapi-good-winston';
import { winstonLogger } from '../../../utils/logger/logger';

export default {
  register: async (server: Hapi.Server) => {
    await server.register([
      {
        plugin: Good,
        options: {
          reporters: {
            winstonWithLogLevels: [
              GoodWinston(winstonLogger, {
                levels: {
                  response: 'info',
                  error: 'error'
                }
              })
            ]
          }
        }
      }
    ]);
  }
};
