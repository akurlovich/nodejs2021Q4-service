import { v4 } from 'uuid';
import { ITask } from '../../types/types';

export default class Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;

  constructor({
    id = v4(),
    title = "title",
    order = 0,
    description = '',
    boardId = '',
    userId = '',
    columnId = '',
  } = {} as ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
};
