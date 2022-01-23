import Board from './board.model';
import * as database from '../../common/dataBase';

const getBoards = async (): Promise<Board[]> => database.getAllBoards();
const add = async (userData: Board): Promise<Board> => database.addBoard(userData);
const getOneBoard = async (id: string): Promise<Board | null> =>
  database.getBoard(id);
const update = async (user: Board): Promise<Board> => database.updateBoard(user);
const remove = async (id: string): Promise<void> => database.deleteBoard(id);

export { getBoards, add, getOneBoard, update, remove };