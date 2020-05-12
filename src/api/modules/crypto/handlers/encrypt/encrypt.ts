import * as Boom from '@hapi/boom';
import * as NodeRSA from 'node-rsa';
import { RequestPromiseAPI } from 'request-promise';
import { Database, UserEntity } from '../../../../../utils/db/types';

export function encrypt(db: Database, rp: RequestPromiseAPI, nodeRsa: typeof NodeRSA) {
  return async (req, res) => {
    const { pubKey } = <UserEntity>req.auth.credentials.user;

    if (!pubKey) {
      throw Boom.badData('public_key_not_generated');
    }

    const pdf = await rp.get('http://www.africau.edu/images/default/sample.pdf');

    const keyPublic = new nodeRsa(pubKey);

    const encrypted = keyPublic.encrypt(pdf.toString(), 'base64');

    return res.response(encrypted).header('content-type', 'text/plain');
  };
}
