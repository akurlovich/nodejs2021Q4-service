import { ApiProperty } from '@nestjs/swagger';
import { IBoardColumn } from '../interfaces/board.interface';

export class CreateBoardDto {
  id?: string | undefined;

  @ApiProperty({ type: String, description: 'title' })
  title?: string | undefined;

  @ApiProperty({ type: Array, description: 'columns' })
  columns?: IBoardColumn[];
}
