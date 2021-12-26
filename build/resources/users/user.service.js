import usersRepo from './user.memory.repository';
var getAll = function () { return usersRepo.getAll(); };
var createUser = function (user) { return usersRepo.createUser(user); };
var getById = function (id) { return usersRepo.getById(id); };
var putById = function (newUser, id) { return usersRepo.putById(newUser, id); };
var deleteById = function (id) { return usersRepo.deleteById(id); };
export default { getAll: getAll, createUser: createUser, getById: getById, putById: putById, deleteById: deleteById };
