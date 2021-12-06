const Task = require('./task.model');

let tasks = [];

const getAll = async () => tasks;

const createTask = async (task) => {
  const newTask = new Task(task);
  tasks.push(newTask);
  return newTask;
};

const getById = async (id) => {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return false;
  return tasks[idx];
};

const putById = async (newUser, id) => {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return false;
  tasks[idx] = new Task({ id, ...newUser });
  return tasks[idx];
};

const deleteById = async (id) => {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return 404;
  tasks.splice(idx, 1);
  return 204;
};

const deleteUser = async (id) => {
  tasks = tasks.map(task => {
    if (task.userId === id) {
      const newTask = Object.assign(task, {userId:null});
      return newTask
    }
    return task;
  });
};

const deleteBoard = async (id) => {
  tasks = tasks.filter(task => {
    if (task.boardId === id) {
      return false;
    }
    return task;
  });
};
module.exports = { getAll, createTask, getById, putById, deleteById, deleteUser, deleteBoard };

