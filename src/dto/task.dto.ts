import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  id?: string;

  @ApiProperty({ type: String, description: 'title' })
  title?: string;

  @ApiProperty({ type: String, description: 'order' })
  order?: number;

  @ApiProperty({ type: String, description: 'description' })
  description?: string;

  @ApiProperty({ type: String, description: 'userId' })
  userId?: string | null;

  @ApiProperty({ type: String, description: 'boardId' })
  boardId?: string | null;

  @ApiProperty({ type: String, description: 'columnId' })
  columnId?: string | null;
}
