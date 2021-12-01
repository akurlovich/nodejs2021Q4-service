const fastify = require('fastify')({ logger: false });
const { PORT } = require('./common/config');

// fastify.register(require('./resources/users/user.router.js'));
// fastify.register(require('./resources/task/task.router.js'));
// fastify.register(require('./resources/board/board.router.js'));

fastify.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});
