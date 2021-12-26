import boardsRepo from './board.memory.repository';
var getAll = function () { return boardsRepo.getAll(); };
var createBoard = function (board) { return boardsRepo.createBoard(board); };
var getById = function (id) { return boardsRepo.getById(id); };
var putById = function (newBoard, id) { return boardsRepo.putById(newBoard, id); };
var deleteById = function (id) { return boardsRepo.deleteById(id); };
export default { getAll: getAll, createBoard: createBoard, getById: getById, putById: putById, deleteById: deleteById };
