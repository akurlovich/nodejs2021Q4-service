import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

import {Board} from '../entity/Board'
import {Task} from '../entity/Task'

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task])],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
