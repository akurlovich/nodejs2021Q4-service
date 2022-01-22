

import User from '../resources/users/user.model';
import Task from '../resources/tasks/tasks.model';
import Board from '../resources/boards/board.model';



const users: User[] = [];
const boards = [new Board()];
let tasks = [new Task()];

// users
const getAllUsers = (): User[] => users;

const addUser = (userData: User): User => {
  const userList = getAllUsers();

  userList.push(userData);

  return userData;
};

const getUser = (id: string) => {
  const userList = getAllUsers();

  const user = userList.find((item) => item.id === id);

  if (!user) {
    return null;
  }
  return user;
};

const updateUser = (user: User): User => {
  const userList = getAllUsers();

  const idx = userList.findIndex((listUser) => listUser.id === user.id);
  console.log(userList);
  userList[idx] = user;

  return user;
};

const deleteUser = (id: string): void => {
  const userList = getAllUsers();

  const idx = userList.findIndex((listUser) => listUser.id === id);

  userList.splice(idx, 1);

  tasks.forEach((task) => {
    if (task.userId === id) {
      task.userId = null;
    }
  });
};

// tasks
const getAllTasks = (): Task[] => tasks;

const addTask = (taskData: Task): Task => {
  const taskList: Task[] = getAllTasks();

  taskList.push(taskData);

  return taskData;
};

const getTask = (id: string): Task | undefined => {
  const taskList: Task[] = getAllTasks();

  const task = taskList.find((item) => item.id === id);

  if (!task) {
    return undefined;
  }

  return task;
};

const updateTask = (task: Task): Task => {
  const taskList: Task[] = getAllTasks();

  const idx = taskList.findIndex((listTask) => listTask.id === task.id);

  taskList[idx] = task;

  return task;
};

const deleteTask = (id: string): void => {
  const taskList: Task[] = getAllTasks();

  const idx = taskList.findIndex((listTask) => listTask.id === id);

  taskList.splice(idx, 1);
};

// Boards
const getAllBoards = (): Board[] => boards;

const addBoard = (boardData: Board): Board => {
  const boardList: Board[] = getAllBoards();

  boardList.push(boardData);

  return boardData;
};

const getBoard = (id: string): Board | null => {
  const boardList: Board[] = getAllBoards();

  const board = boardList.find((item) => item.id === id);
  if (!board) {
    return null;
  }
  return board;
};

const updateBoard = (board: Board): Board => {
  const boardList: Board[] = getAllBoards();

  const idx = boardList.findIndex((listBoard) => listBoard.id === board.id);

  boardList[idx] = board;

  return board;
};

const deleteBoard = (id: string): void => {
  const boardList: Board[] = getAllBoards();

  const idx = boardList.findIndex((listBoard) => listBoard.id === id);

  console.log('FORM before BOARD', tasks);

  tasks = tasks.filter((task) => task.boardId !== id);

  boardList.splice(idx, 1);
  console.log('FORM after BOARD', tasks);
};

export {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getAllTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
  getAllBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
};
