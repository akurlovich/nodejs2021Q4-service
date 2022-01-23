import { getRepository } from 'typeorm';
import { Task } from '../entity/Task';

export interface ITaskPayload {
  title?: string;

  order?: number;

  description?: string;

  userId?: string | null;

  boardId?: string | null;

  columnId?: string | null;
}

export const getTasks = async (): Promise<Array<Task>> => {
  const taskRepository = getRepository(Task);
  return taskRepository.find();
};

export const createTask = async (
  boardId: string | undefined,
  payload: ITaskPayload
): Promise<Task> => {
  const taskRepository = getRepository(Task);
  const task = new Task();
  return taskRepository.save({
    ...task,
    ...payload,
    boardId,
  } as Task);
};

export const updateTask = async (
  id: string | undefined,
  task: ITaskPayload
): Promise<Task | 'not found'> => {
  const taskRepository = getRepository(Task);
  const res = await taskRepository.findOne(id);

  if (res === undefined) {
    return 'not found';
  }

  return taskRepository.save({
    ...res,
    ...task,
  } as Task);
};

export const deleteTask = async (
  id: string
): Promise<'Deleted' | 'Not found'> => {
  const taskRepository = getRepository(Task);
  const deleted = await taskRepository.delete(id);
  if (deleted.affected) {
    return 'Deleted';
  }
  return 'Not found';
};

export const getTask = async (
  id: string | undefined
): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(id);
  if (!task) return undefined;
  return task;
};
