// const { Router } = require('express');
const User = require('./user.model');
const usersService = require('./user.service');

// const router = new Router();

module.exports = function (fastify, opts, done) {
  fastify.get('/users', async (request, reply) => {
    try {
      const users = await usersService.getAll();
      if (users) {

        reply.send(users.map(User.toResponse));
      } else {
        // reply.statusCode(400);
        reply.send({ message: 'Bad request' })

        // reply.status(400).json({message: 'Bad request'});
      }
    } catch (error) {
      // reply.statusCode(500);
      reply.send(error);
      // reply.status(500).json(error);
    }
  });

  fastify.post('/users', async (request, reply) => {

    try {
      const user = await usersService.createUser(new User(request.body));
      // console.log('object', user)
      // console.log('object2', User.toResponse(user))
      if (user) {
        reply.code(201);
        reply.send(User.toResponse(user));
      } else {
        // reply.statusCode(400);
        reply.send({ message: 'Bad request' })
      }
    } catch (error) {
      // reply.statusCode(500);
      reply.send(error);
    }
  });

  fastify.get('/users/:id', async (request, reply) => {
    // console.log('ID', request.params.id)
    try {
      // reply.send({message: `User id ${request.params.id}`})
      const user = await usersService.getById(request.params.id);
      if (user) {
        reply.send(User.toResponse(user));
      } else {
        reply.code(404);
        reply.send({ message: 'User not found' })
      }
    } catch (error) {
      // reply.statusCode(500);
      reply.send(error);
    }
  });

  fastify.put('/users/:id', async (request, reply) => {
    try {
      const user = await usersService.putById(request.body, request.params.id);
      if (user) {
        reply.code(200);
        reply.send(User.toResponse(user));
        // res.status(200).json(User.toResponse(user));
      } else {
        reply.code(400);
        reply.send({ message: 'Bad request' })
        // res.status(400).json({ message: 'Bad request' });
      }
    } catch (error) {
      reply.send(error);
      // res.status(500).json(error);
    }
  });

  fastify.delete('/users/:id', async (request, reply) => {
    // console.log('delete task')
    await usersService.deleteById(request.params.id);//! !!!!!!!!!!!!!!!
    reply.code(204);
    // try {
    //   const status = await usersService.deleteById(request.params.id);//! !!!!!!!!!!!!!!!
    //   // console.log('object', status)
    //   if (status) {
    //     reply.code(204);
    //     reply.send({ message: 'The user has been deleted' })
    //     // res.status(204).json({ message: 'The user has been deleted' });
    //   } else {
    //     reply.code(404);
    //     reply.send({ message: 'User not found' })
    //     // res.status(404).json({ message: 'User not found' });
    //   }
    // } catch (error) {
    //   reply.send(error);
    //   // res.status(500).json(error);
    // }
  });

  done();
}

// router.get('/', async (req, res) => {
//   try {
//     const users = await usersService.getAll();
//     if (users) {
//       res.json(users.map(User.toResponse));
//     } else {
//       res.status(400).json({message: 'Bad request'});
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const users = await usersService.getAll();
//     if (users) {
//       res.json(users.map(User.toResponse));
//     } else {
//       res.status(400).json({message: 'Bad request'});
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const user = await usersService.createUser(new User(req.body));
//     if (user) {
//       res.status(201).json(User.toResponse(user));
//     } else {
//       res.status(400).json({message: 'Bad request'});
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const user = await usersService.getById(req.params.id);
//     if (user) {
//       res.json(User.toResponse(user));
//     } else {
//       res.status(404).json({message: 'User not found'});
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const user = await usersService.putById(req.body, req.params.id);
//     if (user) {
//       res.status(200).json(User.toResponse(user));
//     } else {
//       res.status(400).json({message: 'Bad request'});
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }

// });

// router.delete('/:id', async (req, res) => {
//   // console.log(req.params.id)
//   try {
//     const status = await usersService.deleteById(req.params.id);
//     if (status) {
//       res.status(204).json({message: 'The user has been deleted'});
//     } else {
//       res.status(404).json({message: 'User not found'});
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }

// });

// module.exports = router;
