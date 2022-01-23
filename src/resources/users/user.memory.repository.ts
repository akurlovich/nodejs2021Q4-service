import * as database from '../../common/dataBase';
import User from './user.model';

const getUsers = async (): Promise<User[]> => database.getAllUsers();
const add = async (userData: User): Promise<User> =>
  database.addUser(userData);
const getOneUser = async (id: string): Promise<User | null> => database.getUser(id);
const update = async (user: User): Promise<User> => database.updateUser(user);
const remove = async (id: string): Promise<void> => database.deleteUser(id);


export { getUsers, add, getOneUser, update, remove };
