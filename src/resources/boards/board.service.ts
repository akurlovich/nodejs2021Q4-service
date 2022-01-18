import * as boardsRepo from './board.memory.repository';
import Board from './board.model';

const getAllBoards = ():Promise<Board[]> => boardsRepo.getBoards();
const addBoard = (board: Board): Promise<Board> => boardsRepo.add(board);
const getBoard = (id: string): Promise<Board | null> => boardsRepo.getOneBoard(id);
const updateBoard = (board: Board): Promise<Board> =>
  boardsRepo.update(board);
const deleteBoard = (id: string): Promise<void> => boardsRepo.remove(id);

export { getAllBoards, addBoard, getBoard, updateBoard, deleteBoard };