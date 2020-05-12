import * as Hapi from '@hapi/hapi';
import * as JWT from 'jsonwebtoken';
import makeAuthHandlers from './makeAuthHandlers';
import { registerValidation } from './handlers/signIn/signIn';
import db from '../../../utils/db';

const authRoutes: () => Hapi.ServerRoute[] = () => {
  const { register } = makeAuthHandlers(db, JWT.sign);

  return [
    {
      method: 'POST',
      handler: register,
      path: '/api/sign-in',
      options: {
        tags: ['api', 'Auth'],
        notes: ['Register a new account.'],
        validate: registerValidation,
        auth: false
      }
    }
  ];
};

export default authRoutes;
