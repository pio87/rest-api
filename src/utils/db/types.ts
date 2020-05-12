export type Database = {
  User: UserTable;
};

export type UserUpdateParams = {
  [key in keyof UserEntity]?: string;
};

export type UserTable = {
  _data: UserEntity[];
  create: (user: UserEntity) => UserEntity;
  update: (email: string, params: UserUpdateParams) => UserEntity | null;
  findByEmail: (email: string) => UserEntity | null;
};

export type UserEntity = {
  email: string;
  password: string;
  pubKey: string | null;
};
