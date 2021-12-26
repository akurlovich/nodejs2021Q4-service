import { ITask } from '../../types/types';
import tasksRepo from './task.memory.repository';

const getAll = () => tasksRepo.getAll();

const createTask = (task: ITask) => tasksRepo.createTask(task);

const getById = (id: string) => tasksRepo.getById(id);

const putById = (newTask: ITask, id: string) => tasksRepo.putById(newTask, id);

const deleteById = (id: string)=> tasksRepo.deleteById(id);

const deleteUser = (id: string)=> tasksRepo.deleteUser(id);

const deleteBoard = (id: string)=> tasksRepo.deleteBoard(id);

export default { getAll, createTask, getById, putById, deleteById, deleteUser, deleteBoard };
