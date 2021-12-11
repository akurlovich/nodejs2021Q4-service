import { IBoard } from '../../types/types';
import boardsRepo from './board.memory.repository';

const getAll = () => boardsRepo.getAll();

const createBoard = (board: IBoard) => boardsRepo.createBoard(board);

const getById = (id: string) => boardsRepo.getById(id);

const putById = (newBoard: IBoard, id: string) => boardsRepo.putById(newBoard, id);

const deleteById = (id: string) => boardsRepo.deleteById(id);

export default { getAll, createBoard, getById, putById, deleteById };
