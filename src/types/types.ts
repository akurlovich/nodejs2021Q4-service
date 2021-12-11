export interface IUser {
  id: string;
  name: string;
  login: string;
  password?: string;
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export interface IColumn {
  id: string | null;
  title: string;
  order: number;
}