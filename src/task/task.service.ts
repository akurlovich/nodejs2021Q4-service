import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entity/Task';

import { ITask } from '../interfaces/task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>
  ) {}

  async getTasks(): Promise<Task[]> {
    return this.repo.find();
  }

  async getTask(id: string | undefined): Promise<ITask | undefined> {
    const task = await this.repo.findOne(id);
    if (!task) {
      return undefined;
    }
    return task;
  }

  async createTask(boardId: string, task: Task): Promise<Task> {
    const newTask = new Task();
    return this.repo.save({
      ...task, 
      ...newTask,
      boardId
    });
  }

  updateTask(id: string | undefined, task: Task): Promise<Task | undefined> {
    const taskDb = this.repo.findOne(id);

    return this.repo.save({
      ...task,
      ...taskDb,
    });
  }

  async deleteTask(id: string | number) {
    return this.repo.delete(id);
  }
}
