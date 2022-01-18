import { Router, Response, Request } from 'express';
import { getConnection } from 'typeorm';
import { Board } from '../../entity/Board';
import { Task } from '../../entity/Task';

import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../../repositories/board';

const router = Router();

router.route('/').get(async (_req: Request, res: Response) => {
  const boards = await getBoards();
  res.status(boards ? 200 : 404).json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const boardId = req.params['id'];
  const board = await getBoard(boardId);

  res.status(board ? 200 : 404).json(Board.toResponse(board));
});

router.route('/').post(async (req: Request, res: Response) => {
  const response = await createBoard(req.body);
  res.status(201).json(response);
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const { body } = req;
  const boardId = req.params['id'];

  const response = await updateBoard(boardId, body);
  res.status(200).json(response);
});

router.route('/:id').delete(async (req, res) => {
  const boardId = req.params.id;
  await deleteBoard(boardId);

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Task)
    .where('boardId = :boardId', { boardId })
    .execute();

  res.status(204).json(null);
});

export default router;
