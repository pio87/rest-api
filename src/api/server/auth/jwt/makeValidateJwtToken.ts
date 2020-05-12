import { Database } from '../../../../utils/db/types';
import { JwtSignedUserObject } from '../../../../../typings';

export const makeValidateJwtToken = (db: Database) => async (decoded: JwtSignedUserObject) => {
  const invalidResponse = {
    isValid: false,
    credentials: {
      user: {}
    }
  };

  const user = db.User.findByEmail(decoded.email);

  if (!user) {
    return invalidResponse;
  }

  return {
    isValid: true,
    credentials: { user }
  };
};
