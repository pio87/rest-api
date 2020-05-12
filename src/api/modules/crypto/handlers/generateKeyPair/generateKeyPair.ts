import { Database } from '../../../../../utils/db/types';
import { JwtSignedUserObject } from '../../../../../../typings';
import * as NodeRSA from 'node-rsa';

export function generateKeyPair(db: Database, nodeRsa: typeof NodeRSA) {
  return async (req) => {
    const { user } = <{ user: JwtSignedUserObject }>req.auth.credentials;

    const keyPair = new nodeRsa({ b: 1024 });

    const pubKey = keyPair.exportKey('public');

    db.User.update(user.email, { pubKey });

    return {
      privKey: keyPair.exportKey('private'),
      pubKey
    };
  };
}
