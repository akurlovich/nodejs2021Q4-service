export type IBoardColumn = {
  id: string | null;
  title: string;
  order: number;
};

export interface IBoard {
  id?: string | undefined;

  title?: string | undefined;

  columns?: IBoardColumn[];
}
