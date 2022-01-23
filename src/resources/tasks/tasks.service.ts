import * as tasksRepo from'./tasks.memory.repository';
import Task from './tasks.model';

const getAllTasks = ():Promise<Task[]> => tasksRepo.getTasks();
const addTask = (task:Task):Promise<Task> => tasksRepo.add(task);
const getTask = (id:string):Promise<Task | undefined> => tasksRepo.getOneTask(id);
const updateTask = (board:Task):Promise<Task> => tasksRepo.update(board);
const deleteTask = (id:string):Promise<void> => tasksRepo.remove(id);

export { getAllTasks, addTask, getTask, updateTask, deleteTask };
