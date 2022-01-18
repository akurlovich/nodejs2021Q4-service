import { getRepository } from 'typeorm';
// import { Task } from '../entity/Task';
import { User } from '../entity/User';

export interface IUserPayload {
  name?: string;

  login?: string;

  password?: string;
}

export const getUsers = async (): Promise<Array<User>> => {
  const userRepository = getRepository(User);
  return userRepository.find();
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User();
  return userRepository.save({
    ...user,
    ...payload,
  });
};

export const updateUser = async (
  id: string | undefined,
  user: IUserPayload
): Promise<User | 'not found'> => {
  const userRepository = getRepository(User);
  const res = await userRepository.findOne(id);

  if (res === undefined) {
    return 'not found';
  }

  return userRepository.save({
    ...res,
    ...user,
  });
};

export const deleteUser = async (
  id: string
): Promise<'Deleted' | 'Not found'> => {
  const userRepository = getRepository(User);
  const deleted = await userRepository.delete(id);
  if (deleted.affected) {
    return 'Deleted';
  }
  return 'Not found';

};

export const getUser = async (
  id: string | undefined
): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  if (!user) return undefined;
  return user;
};
