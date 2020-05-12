import * as JWT from 'jsonwebtoken';
import * as Boom from '@hapi/boom';
import * as Joi from '@hapi/joi';
import { Database } from '../../../../../utils/db/types';
import { env } from '../../../../../config/env';
import { JwtSignedUserObject } from '../../../../../../typings';

export const registerValidation = {
  payload: Joi.object({
    email: Joi.string().email().required().description('User defined email'),
    password: Joi.string().required().description('User defined password')
  })
    .required()
    .label('registerPayload')
};

export type RegisterValidation = Joi.extractType<typeof registerValidation>;

export function signIn(db: Database, jwtSign: typeof JWT.sign) {
  return async (req) => {
    const payload = req.payload as RegisterValidation['payload'];

    const email = payload.email.toLowerCase();

    const alreadyRegistered = db.User.findByEmail(email);

    if (alreadyRegistered) {
      throw Boom.badRequest('already_registered');
    }

    const user = db.User.create({
      email,
      pubKey: null,
      password: payload.password
    });

    const jwtObject: JwtSignedUserObject = { email: user.email };

    return {
      authToken: jwtSign(jwtObject, env.JWT_SECRET)
    };
  };
}
