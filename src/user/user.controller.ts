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
  HttpException,
  HttpStatus,
  UseGuards,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import { CustomExceptionFilter } from '../exception-filter/exception.filter';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from './user.service';
import { User } from '../entity/User';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseFilters(new CustomExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get users' })
  @ApiUnauthorizedResponse()
  @Get()
  @HttpCode(200)
  async getUsers() {
    const users = await this.userService.getUsers();

    if (!users) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return users.map(User.toResponse);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get user by id' })
  @ApiUnauthorizedResponse()
  @Get(':id')
  @HttpCode(200)
  async getOne(@Param('id') id: string): Promise<User | undefined> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return User.toResponse(user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Create user' })
  @ApiUnauthorizedResponse()
  @Post()
  @HttpCode(201)
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<User | undefined> {
    const response = await this.userService.createUser(createUserDto);
    if (!response) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return User.toResponse(response);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update user' })
  @ApiUnauthorizedResponse()
  @Put(':id')
  @HttpCode(200)
  updateOne(
    @Body() updateUserDto: CreateUserDto,
    @Param('id') id: string | undefined
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Delete users' })
  @ApiUnauthorizedResponse()
  @Delete(':id')
  @HttpCode(200)
  async deleteOne(@Param('id') id: string | number) {
    const deleted = await this.userService.deleteUser(id);

    if (!deleted.affected) {
      throw new HttpException('No Content!', HttpStatus.NO_CONTENT);
    }
    return null;
  }
}
