import { IUser } from '../../types/types';
import usersRepo from './user.memory.repository';

const getAll = () => usersRepo.getAll();

const createUser = (user: IUser) => usersRepo.createUser(user);

const getById = (id: string) => usersRepo.getById(id);

const putById = (newUser: IUser, id: string) => usersRepo.putById(newUser, id);

const deleteById = (id: string)=> usersRepo.deleteById(id);

export default { getAll, createUser, getById, putById, deleteById };
