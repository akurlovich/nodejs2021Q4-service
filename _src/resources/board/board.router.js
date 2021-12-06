const boardsService = require('./board.service');

module.exports = function (fastify, opts, done) {
  fastify.get('/boards', async (request, reply) => {
    try {
      const boards = await boardsService.getAll();
      if (boards) {
        reply.send(boards);
      } else {
        reply.code(400);
        reply.send({ message: 'Bad request' })
      }
    } catch (error) {
      reply.send(error)
      // res.status(500).json(error);
    }
  });

  fastify.post('/boards', async (request, reply) => {
    try {
      const board = await boardsService.createBoard(request.body);
      reply.code(201);
      reply.send(board);
    } catch (error) {
      // reply.statusCode(500);
      reply.send(error);
    }
  });

  fastify.get('/boards/:id', async (request, reply) => {
    try {
      const board = await boardsService.getById(request.params.id);
      if (board) {
        reply.send(board);
      } else {
        reply.code(404);
        reply.send({ message: 'User not found' })
      }
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.put('/boards/:id', async (request, reply) => {
    try {
      const board = await boardsService.putById(request.body, request.params.id);
      if (board) {
        reply.send(board);
      } else {
        reply.code(404);
        reply.send({ message: 'User not found' })
      }
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.delete('/boards/:id', async (request, reply) => {
    await boardsService.deleteById(request.params.id);
    reply.code(204);
    // try {
    //   const status = await boardsService.deleteById(request.params.id);//! !!!!!!!!!!!!!!!
    //   if (status) {
    //     reply.code(204);
    //     reply.send({message: 'The user has been deleted'})
    //     // res.status(204).json({message: 'The user has been deleted'});
    //   } else {
    //     reply.code(404);
    //     reply.send({ message: 'User not found' })
    //   }
    // } catch (error) {
    //   reply.send(error);
    // }
  });

  done();
}