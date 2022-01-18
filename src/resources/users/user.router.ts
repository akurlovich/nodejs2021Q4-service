import { Router, Response, Request } from 'express';
// import { CustomError } from '../../utils';
import { getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { Task } from '../../entity/Task';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../../repositories/user';

const router = Router();

// get all users
router.route('/').get(async (_req: Request, res: Response) => {
  const users = await getUsers();

  res.status(users ? 200 : 404).json(users.map(User.toResponse));
});
// get user
router.route('/:id').get(async (req: Request, res: Response) => {
  const userId = req.params['id'];
  const user = await getUser(userId);

  res.status(user ? 200 : 404).json(User.toResponse(user));
});

// create new user
router.route('/').post(async (req: Request, res: Response) => {
  const response = await createUser(req.body);
  res.status(201).json(User.toResponse(response));
});

// update user by id
router.route('/:id').put(async (req: Request, res: Response) => {
  const { body } = req;
  const userId = req.params['id'];

  const response = await updateUser(userId, body);
  res.status(200).json(response);
});

// delete user
router.route('/:id').delete(async (req, res) => {
  const userId = req.params.id;
  await deleteUser(userId);

  await getConnection()
    .createQueryBuilder()
    .update(Task)
    .set({
      userId: null,
    })
    .where('userId = :userId', { userId })
    .execute();

  res.status(204).json(null);
});

export default router;
