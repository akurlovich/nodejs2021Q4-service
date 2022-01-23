import { v4 as uuid } from 'uuid';

type Column = {
  id: string | null;
  title: string;
  order: number;
};
class Board {
  id?: string;

  title?: string;

  columns?: Column[];

  constructor(
    {
      id = uuid(),
      title = 'Autotest board',
      columns = [
        {id: null, title: 'Backlog', order: 1 } as Column,
        {id: null, title: 'Sprint', order: 2 } as Column,
      ],
    } = {} as Board
  ) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: Board):Board {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
