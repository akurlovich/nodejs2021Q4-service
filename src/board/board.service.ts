import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Board } from '../entity/Board';
import { Task } from '../entity/Task';

import { IBoard } from '../interfaces/board.interface';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly repo: Repository<Board>,
    private connection: Connection
  ) {}

  async getBoards(): Promise<Board[]> {
    return this.repo.find();
  }

  async getBoard(id: string | undefined): Promise<IBoard | undefined> {
    const board = await this.repo.findOne(id);
    if (!board) {
      return undefined;
    }
    return board;
  }

  async createUser(board: IBoard): Promise<Board> {
    const newBoard = new Board();
    return this.repo.save({
      ...board,
      ...newBoard,
    });
  }

  updateBoard(id: string | undefined, board: Board): Promise<Board | undefined> {
    const boardDb = this.repo.findOne(id);

    return this.repo.save({
      ...board,
      ...boardDb,
    });
  }

  async deleteBoard(id: string | number) {

    await this.connection
      .getRepository(Task)
      .createQueryBuilder('task')
      .delete()
      .from(Task)
      .where('boardId = :boardId', { boardId: id })
      .execute();
  

    return this.repo.delete(id);
  }
}
