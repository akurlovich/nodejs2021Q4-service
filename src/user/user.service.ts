import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entity/User';
import { Task } from '../entity/Task';

import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private connection: Connection
  ) {}

  async getUsers(): Promise<User[]> {
    return this.repo.find();
  }

  async getUser(id: string | undefined): Promise<IUser | undefined> {
    const user = await this.repo.findOne(id);
    if (!user) {
      return undefined;
    }
    return user;
  }

  async createUser(user: IUser): Promise<User> {
    const newUser = new User();
    user.password = await bcrypt.hash(user.password!, 8);

    return this.repo.save({
      ...user,
      ...newUser,
      password: user.password,
    });
  }

  updateUser(id: string | undefined, user: User): Promise<User | undefined> {
    const userDb = this.repo.findOne(id);

    return this.repo.save({
      ...user,
      ...userDb,
    });
  }

  async deleteUser(id: string | number) {
    await this.connection
      .getRepository(Task)
      .createQueryBuilder('task')
      .update(Task)
      .set({
        userId: null,
      })
      .where('userId = :userId', { userId: id })
      .execute();

    return this.repo.delete(id);
  }

  async findByLogin(login: string | undefined) {
    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.login = :login', { login })
      .getOne();
  }
}
