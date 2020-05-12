import * as JWT from 'jsonwebtoken';
import { signIn } from './handlers/signIn/signIn';
import { Database } from '../../../utils/db/types';

export type AA = typeof JWT;

const makeAuthHandlers = (db: Database, jwtSign: typeof JWT.sign) => ({
  register: signIn(db, jwtSign)
});

export default makeAuthHandlers;
