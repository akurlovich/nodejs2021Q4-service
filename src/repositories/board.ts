import { getRepository } from 'typeorm';
import { Board, IBoardColumn } from '../entity/Board';

export interface IBoardPayload {
  title?: string;

  columns?: IBoardColumn[];

}

export const getBoards = async (): Promise<Array<Board>> => {
  const boardRepository = getRepository(Board);
  return boardRepository.find();
};

export const createBoard = async (payload: IBoardPayload): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const board = new Board();
  return boardRepository.save({
    ...board,
    ...payload,
  });
};

export const updateBoard = async (
  id: string | undefined,
  board: IBoardPayload
): Promise<Board | 'not found'> => {
  const boardRepository = getRepository(Board);
  const res = await boardRepository.findOne(id);

  if (res === undefined) {
    return 'not found';
  }

  return boardRepository.save({
    ...res,
    ...board,
  });
};

export const deleteBoard = async (
  id: string
): Promise<'Deleted' | 'Not found'> => {
  const boardRepository = getRepository(Board);
  const deleted = await boardRepository.delete(id);
  if (deleted.affected) {
    return 'Deleted';
  }
  return 'Not found';
};

export const getBoard = async (
  id: string | undefined
): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id);
  if (!board) return undefined;
  return board;
};
