import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../common/config';

import { User } from '../../entity/User';

export const createToken = async (user: User | undefined) => {
  const userDb = await getConnection()
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('login = :login', { login: user?.login })
    .getOne();


  if (!userDb) {
    return undefined;
  }
  const token = jwt.sign(
    { id: userDb.id, login: userDb.login },
    JWT_SECRET_KEY!
  );
  return token;
};
