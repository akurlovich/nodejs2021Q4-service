import {
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  // ApiBody,
} from '@nestjs/swagger';

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UseFilters,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CustomExceptionFilter } from '../exception-filter/exception.filter';
import { CreateBoardDto } from '../dto/board.dto';
import { BoardService } from './board.service';
import { Board } from '../entity/Board';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('boards')
@UseGuards(JwtAuthGuard)
@UseFilters(new CustomExceptionFilter())
export class BoardController {
  constructor(private readonly boardService: BoardService) {}


  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get boards' })
  @ApiUnauthorizedResponse()
  @Get()
  @HttpCode(200)
  async getBoards() {
    const users = await this.boardService.getBoards();

    if (!users) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return users.map(Board.toResponse);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get board' })
  @ApiUnauthorizedResponse()
  @Get(':id')
  @HttpCode(200)
  async getOne(@Param('id') id: string): Promise<Board | undefined> {
    const board = await this.boardService.getBoard(id);
    if (!board) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return Board.toResponse(board);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Create board' })
  @ApiUnauthorizedResponse()
  @Post()
  @HttpCode(201)
  async createBoard(
    @Body() createBoardDto: CreateBoardDto
  ): Promise<Board | undefined> {
    const response = await this.boardService.createUser(createBoardDto);
    if (!response) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return Board.toResponse(response);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update board' })
  @ApiUnauthorizedResponse()
  @Put(':id')
  @HttpCode(200)
  updateOne(
    @Body() updateBoardDto: CreateBoardDto,
    @Param('id') id: string | undefined
  ) {
    return this.boardService.updateBoard(id, updateBoardDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Delete board' })
  @ApiUnauthorizedResponse()
  @Delete(':id')
  @HttpCode(200)
  async deleteOne(@Param('id') id: string | number) {
    const deleted = await this.boardService.deleteBoard(id);

    if (!deleted.affected) {
      throw new HttpException('No Content!', HttpStatus.NO_CONTENT);
    }

    return null;
  }
}
