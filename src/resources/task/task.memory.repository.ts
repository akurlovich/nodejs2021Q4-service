import { ITask } from '../../types/types';
import Task from './task.model';

let tasks: ITask[] = [];

const getAll = async () => tasks;

const createTask = async (task: ITask) => {
  const newTask = new Task(task);
  tasks.push(newTask);
  return newTask;
};

const getById = async (id: string) => {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return false;
  return tasks[idx];
};

const putById = async (newUser: ITask, id: string) => {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return false;
  tasks[idx] = new Task({ ...newUser });
  return tasks[idx];
};

const deleteById = async (id: string) => {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return 404;
  tasks.splice(idx, 1);
  return 204;
};

const deleteUser = async (id: string) => {
  tasks = tasks.map(task => {
    if (task.userId === id) {
      const newTask = Object.assign(task, {userId:null});
      return newTask
    }
    return task;
  });
};

const deleteBoard = async (id: string) => {
  tasks = tasks.filter(task => {
    if (task.boardId === id) {
      return false;
    }
    return task;
  });
};
export default { getAll, createTask, getById, putById, deleteById, deleteUser, deleteBoard };

