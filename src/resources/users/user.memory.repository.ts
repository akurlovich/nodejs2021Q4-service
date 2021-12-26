import User from './user.model';
import taskService from '../task/task.service';
import { IUser } from '../../types/types';

const users: IUser[] = [];

const getAll = async () => users;

const createUser = async (user: IUser) => {
  users.push(user);
  return user;
};

const getById = async (id: string) => users.find((user) => user.id === id);

const putById = async (newUser: IUser, id: string) => {
  const idx = users.findIndex((user) => user.id === id);
  if (idx === -1) return false;
  users[idx] = (new User({ ...newUser })) as IUser;
  return users[idx];
};

const deleteById = async (id: string) => {
  const idx = users.findIndex((user) => user.id === id);
  if (idx === -1) return false;
  await taskService.deleteUser(id);
  users.splice(idx, 1);
  return true;
};

export default { getAll, createUser, getById, putById, deleteById };
