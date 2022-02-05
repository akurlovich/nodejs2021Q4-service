import { ApiOkResponse, ApiBody } from '@nestjs/swagger';

import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from '../entity/User';
import { LoginDto } from '../dto/login.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOkResponse({ description: 'User Login' })
  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  async login(@Body() loginDto: User) {
    const token = await this.authService.login(loginDto);
    if (!token) {
      throw new HttpException('Not authorized!', HttpStatus.UNAUTHORIZED);
    }
    return token;
  }

}
