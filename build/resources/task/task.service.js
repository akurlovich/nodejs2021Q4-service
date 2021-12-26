import tasksRepo from './task.memory.repository';
var getAll = function () { return tasksRepo.getAll(); };
var createTask = function (task) { return tasksRepo.createTask(task); };
var getById = function (id) { return tasksRepo.getById(id); };
var putById = function (newTask, id) { return tasksRepo.putById(newTask, id); };
var deleteById = function (id) { return tasksRepo.deleteById(id); };
var deleteUser = function (id) { return tasksRepo.deleteUser(id); };
var deleteBoard = function (id) { return tasksRepo.deleteBoard(id); };
export default { getAll: getAll, createTask: createTask, getById: getById, putById: putById, deleteById: deleteById, deleteUser: deleteUser, deleteBoard: deleteBoard };
