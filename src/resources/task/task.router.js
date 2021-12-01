const tasksService = require('./task.service');

module.exports = function (fastify, opts, done) {
  fastify.get('/boards/:boardId/tasks', async (request, reply) => {
    try {
      const tasks = await tasksService.getAll();
      if (tasks) {
        reply.send(tasks);
      } else {
        reply.code(400);
        reply.send({ message: 'Bad request' })
      }
    } catch (error) {
      reply.send(error)
      // res.status(500).json(error);
    }
  });

  fastify.post('/boards/:boardId/tasks', async (request, reply) => {
    try {
      const newTask = {...request.body}
      newTask.boardId = request.params.boardId
      const task = await tasksService.createTask(newTask);
      if (task) {
        reply.code(201);
        reply.send(task)
        // res.status(201).json(task);
      } else {
        reply.code(400);
        reply.send({ message: 'Bad request' })
      }
    } catch (error) {
      reply.send(error)
    }
  });

  fastify.get('/boards/:boardId/tasks/:id', async (request, reply) => {
    try {
      const task = await tasksService.getById(request.params.id);
      if (task) {
        reply.code(200);
        reply.send(task)
      } else {
        reply.code(404);
        reply.send({ message: 'Not found' })
        // res.status(404).json({message: 'Not found'});
      }
    } catch (error) {
      reply.send(error)
    }
  });

  fastify.put('/boards/:boardId/tasks/:id', async (request, reply) => {
    try {
      const task = await tasksService.putById(request.body, request.params.id);
      if (task) {
        reply.code(200);
        reply.send(task)
      } else {
        reply.code(404);
        reply.send({ message: 'Not found' })
      }
    } catch (error) {
      reply.send(error)
    }
  });

  fastify.delete('/boards/:boardId/tasks/:id', async (request, reply) => {
    await tasksService.deleteById(request.params.id);//! !!!!!!!!
    reply.code(204);
    // try {
    //   const status = await tasksService.deleteById(request.params.id);//! !!!!!!!!
    //   if (status) {
    //     console.log('status', status)
    //     reply.code(status);
    //     // res.status(status).send();
    //   } else {
    //     reply.code(404);
    //     reply.send({ message: 'Not found' })
    //   }
    // } catch (error) {
    //   reply.send(error)
    // }
  });

  done();
}

// const router = new Router();

// router.get('/:boardId/tasks/', async (req, res) => {
//   try {
//     const tasks = await tasksService.getAll();
//     if (tasks) {
//       res.json(tasks);
//     } else {
//       res.status(400).json({message: 'Bad request'});
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.get('/:boardId/tasks/:id', async (req, res) => {
//   try {
//     const task = await tasksService.getById(req.params.id);
//     if (task) {
//       res.json(task);
//     } else {
//       res.status(404).json({message: 'Not found'});
//     }
    
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.post('/:boardId/tasks/', async (req, res) => {
//   try {
//     const newTask = {...req.body}
//     newTask.boardId = req.params.boardId
//     const task = await tasksService.createTask(newTask);
//     if (task) {
//       res.status(201).json(task);
//     } else {
//       res.status(400).json({message: 'Bad request'});
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.put('/:boardId/tasks/:id', async (req, res) => {
//   try {
//     const task = await tasksService.putById(req.body, req.params.id);
//     if (task) {
//       res.json(task);
//     } else {
//       res.status(404).json({message: 'Not found'});
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.delete('/:boardId/tasks/:id', async (req, res) => {
//   try {
//     const status = await tasksService.deleteById(req.params.id);
//     if (status) {
//       res.status(status).send();
//     } else {
//       res.status(404).json({message: 'Not found'});
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// module.exports = router;
