const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const createUser = (user) => usersRepo.createUser(user);

const getById = (id) => usersRepo.getById(id);

const putById = (newUser, id) => usersRepo.putById(newUser, id);

const deleteById = (id)=> usersRepo.deleteById(id);

module.exports = { getAll, createUser, getById, putById, deleteById };
