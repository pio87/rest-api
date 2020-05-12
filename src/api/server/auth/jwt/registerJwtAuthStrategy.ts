import * as Hapi from '@hapi/hapi';
import * as JTW from 'hapi-auth-jwt2';
import { makeValidateJwtToken } from './makeValidateJwtToken';
import db from '../../../../utils/db';
import { env } from '../../../../config/env';

export const registerJwtAuthStrategy = async (server: Hapi.Server) => {
  await server.register(JTW);

  const validate = makeValidateJwtToken(db);

  server.auth.strategy('jwt', 'jwt', {
    validate,
    ttl: 5 * 60 * 1000, // 5 minutes
    key: env.JWT_SECRET
  });

  server.auth.default('jwt');
};
