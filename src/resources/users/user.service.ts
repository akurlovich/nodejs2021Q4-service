import * as usersRepo from './user.memory.repository';
import User from './user.model';

const getAllUsers = (): Promise<User[]> => usersRepo.getUsers();
const addUser = (user: User): Promise<User> => usersRepo.add(user);
const getUser = (id: string): Promise<User | null> => usersRepo.getOneUser(id);
const updateUser = (user: User): Promise<User> => usersRepo.update(user);
const deleteUser = (id: string ): Promise<void> => usersRepo.remove(id);



export { getAllUsers, addUser, getUser, updateUser, deleteUser };
