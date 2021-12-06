const { Router } = require('express');
const User = require('./user.model');
const usersService = require('./user.service');

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const users = await usersService.getAll();
    if (users) {
      res.json(users.map(User.toResponse));
    } else {
      res.status(400).json({message: 'Bad request'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await usersService.getAll();
    if (users) {
      res.json(users.map(User.toResponse));
    } else {
      res.status(400).json({message: 'Bad request'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await usersService.createUser(new User(req.body));
    if (user) {
      res.status(201).json(User.toResponse(user));
    } else {
      res.status(400).json({message: 'Bad request'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await usersService.putById(req.body, req.params.id);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(400).json({message: 'Bad request'});
    }
  } catch (error) {
    res.status(500).json(error);
  }

});

router.delete('/:id', async (req, res) => {
  // console.log(req.params.id)
  try {
    const status = await usersService.deleteById(req.params.id);
    if (status) {
      res.status(204).json({message: 'The user has been deleted'});
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
  
});

module.exports = router;
