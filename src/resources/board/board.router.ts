import { Router } from 'express';
import boardsService from './board.service';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const boards = await boardsService.getAll();
    if (boards) {
      res.json(boards);
    } else {
      res.status(400).json({message: 'Bad request'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // const boardBody = req.body;
  // boardRaw.columns = boardRaw.columns.map((col)=>new Column(col));
  const board = await boardsService.createBoard(req.body);
  res.status(201).json(board);
});

router.get('/:id', async (req, res) => {
  try {
    const board = await boardsService.getById(req.params.id);
    if (board) {
      res.json(board);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }

});

router.put('/:id', async (req, res) => {
  // const boardBody = req.body;
  // boardRaw.columns = boardRaw.columns.map((col) => new Column(col));
  const board = await boardsService.putById(req.body, req.params.id);
  res.json(board);
});

router.delete('/:id', async (req, res) => {
  try {
    const status = await boardsService.deleteById(req.params.id);
    if (status) {
      res.status(204).json({message: 'The user has been deleted'});
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
