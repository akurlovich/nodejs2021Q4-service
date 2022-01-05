import { Router } from 'express';
import tasksService from './task.service';

const router = Router();

router.get('/:boardId/tasks/', async (_, res) => {
  try {
    const tasks = await tasksService.getAll();
    if (tasks) {
      res.json(tasks);
    } else {
      res.status(400).json({message: 'Bad request'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:boardId/tasks/:id', async (req, res) => {
  try {
    const task = await tasksService.getById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({message: 'Not found'});
    }
    
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/:boardId/tasks/', async (req, res) => {
  try {
    const newTask = {...req.body}
    newTask.boardId = req.params.boardId
    const task = await tasksService.createTask(newTask);
    if (task) {
      res.status(201).json(task);
    } else {
      res.status(400).json({message: 'Bad request'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:boardId/tasks/:id', async (req, res) => {
  try {
    const task = await tasksService.putById(req.body, req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({message: 'Not found'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:boardId/tasks/:id', async (req, res) => {
  try {
    const status = await tasksService.deleteById(req.params.id);
    if (status) {
      res.status(status).send();
    } else {
      res.status(404).json({message: 'Not found'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
