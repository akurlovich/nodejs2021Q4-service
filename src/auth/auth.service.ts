import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


import { UserService } from '../user/user.service';
import { User } from '../entity/User';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: User) {
    const { login } = loginDto;

    const user = await this.userService.findByLogin(login);
    if (user) {
      const payload = {
        id: user?.id,
        login: user?.login,
      };

      return {
        token: this.jwtService.sign(payload),
      };
    }
    return null;
  }
}
