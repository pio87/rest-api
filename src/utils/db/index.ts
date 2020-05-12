import { Database, UserEntity, UserTable } from './types';

const User: UserTable = {
  _data: [],

  create(user) {
    User._data.push(user);
    return user;
  },

  update(email, params) {
    const user = User.findByEmail(email);

    if (!user) {
      return null;
    }

    for (const param in params) {
      user[param] = params[param];
    }

    return user;
  },

  findByEmail(email) {
    return User._data.find((user) => user.email === email) || null;
  }
};

const DB: Database = { User };

export default DB;
