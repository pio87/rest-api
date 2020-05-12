import { RequestPromiseAPI } from 'request-promise';
import { generateKeyPair } from './handlers/generateKeyPair/generateKeyPair';
import { encrypt } from './handlers/encrypt/encrypt';
import { Database } from '../../../utils/db/types';
import * as NodeRSA from 'node-rsa';

const makeCryptoHandlers = (db: Database, rp: RequestPromiseAPI, nodeRSA: typeof NodeRSA) => ({
  encrypt: encrypt(db, rp, nodeRSA),
  rsa: generateKeyPair(db, nodeRSA)
});

export default makeCryptoHandlers;
