import Task from './tasks.model';
import * as database from '../../common/dataBase';

const getTasks = async (): Promise<Task[]> => database.getAllTasks();
const add = async (task: Task): Promise<Task> => database.addTask(task);
const getOneTask = async (id: string): Promise<Task | undefined> =>
  database.getTask(id);
const update = async (task: Task): Promise<Task> => database.updateTask(task);
const remove = async (id: string): Promise<void> => database.deleteTask(id);

export { getTasks, add, getOneTask, update, remove };