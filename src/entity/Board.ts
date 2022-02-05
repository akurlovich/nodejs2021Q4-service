import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type IBoardColumn = {
  id: string | null;
  title: string;
  order: number;
};

@Entity({ name: 'board' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { nullable: true })
  title?: string = 'Autotest board';

  @Column('json')
  columns?: IBoardColumn[] = [
    { id: null, title: 'Backlog', order: 1 } as IBoardColumn,
    { id: null, title: 'Sprint', order: 2 } as IBoardColumn,
  ];


  static toResponse(board: Board | undefined): Board | undefined {
    if (board !== undefined) {
      const { id, title, columns } = board;
      return { id, title, columns };
    }
    return undefined;
  }
}
