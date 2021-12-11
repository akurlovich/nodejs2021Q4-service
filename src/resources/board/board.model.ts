import { v4 } from 'uuid';
import { IBoard, IColumn } from '../../types/types';

export default class Board {
  id: string;
  title: string;
  columns: IColumn[];

  constructor({
    id = v4(),
    title = 'title',
    columns = [{ id: null, title: 'New column', order: 0 } as IColumn]
  } = {} as IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
    
    // this.columns = [];
    // columns.forEach(col => {
    //   this.columns.push(new Column({title:col.title, order:col.order}));
    // });
  }
};
