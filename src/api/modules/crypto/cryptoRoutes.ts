import * as Hapi from '@hapi/hapi';
import * as NodeRSA from 'node-rsa';
import * as rp from 'request-promise';
import makeCryptoHandlers from './makeCryptoHandlers';
import db from '../../../utils/db';

const cryptoRoutes: () => Hapi.ServerRoute[] = () => {
  const { rsa, encrypt } = makeCryptoHandlers(db, rp, NodeRSA);

  return [
    {
      method: 'POST',
      handler: rsa,
      path: '/api/generate-key-pair',
      options: {
        tags: ['api', 'Sample'],
        notes: ['Generates key pair for authorized user.']
      }
    },
    {
      method: 'POST',
      handler: encrypt,
      path: '/api/encrypt',
      options: {
        tags: ['api', 'Sample'],
        notes: ['Encrypt sample PDF with public key and return base64.']
      }
    }
  ];
};

export default cryptoRoutes;
