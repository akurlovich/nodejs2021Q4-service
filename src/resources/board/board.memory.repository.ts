import Board from './board.model';
import taskService from '../task/task.service';
import { IBoard } from '../../types/types';

const boards: IBoard[] = [];

const getAll = async () => boards;

const createBoard = async (board: IBoard) => {
  const newBoard = new Board(board);
  boards.push(newBoard);
  return newBoard;
};

const getById = async (id: string) => {
  const idx = boards.findIndex((board) => board.id === id);
  if (idx === -1) return false;
  return boards[idx];
};

const putById = async (newUser: IBoard, id: string) => {
  const idx = boards.findIndex((board) => board.id === id);
  boards[idx] = new Board({ ...newUser });
  return boards[idx];
};

const deleteById = async (id: string) => {
  const idx = boards.findIndex((task) => task.id === id);
  if (idx === -1) return false;
  await taskService.deleteBoard(id);
  boards.splice(idx, 1);
  return true;
};

export default { getAll, createBoard, getById, putById, deleteById };

