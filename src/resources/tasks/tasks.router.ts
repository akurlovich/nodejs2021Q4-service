import { Router, Response, Request } from 'express';
// import { CustomError } from '../../utils';
import { Task } from '../../entity/Task';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../../repositories/task';

const router = Router({ mergeParams: true });

// get all tasks
router.route('/').get(async (_req: Request, res: Response) => {
  const tasks = await getTasks();

  res.status(tasks ? 200 : 404).json(tasks.map(Task.toResponse));
});
// get task
router.route('/:id').get(async (req: Request, res: Response) => {
  const taskId = req.params['id'];
  const task = await getTask(taskId);

  res.status(task ? 200 : 404).json(Task.toResponse(task));
});

// create new task
router.route('/').post(async (req: Request, res: Response) => {
  const boardId = req.params['boardId'];
  const response = await createTask(boardId, req.body);
  res.status(201).json(Task.toResponse(response));
});

// update task by id
router.route('/:id').put(async (req: Request, res: Response) => {
  const { body } = req;
  const taskId = req.params['id'];

  const response = await updateTask(taskId, body);
  res.status(200).json(response);
});

// delete user
router.route('/:id').delete(async (req, res) => {
  const taskId = req.params.id;
  await deleteTask(taskId);

  res.status(204).json(null);
});

export default router;
