/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const data: Prisma.TodoCreateInput = {
        description: createTodoDto.description,
        task: createTodoDto.task,
        status: 'Active',
      };
      console.log('input : ', data)
      return await this.databaseService.todo.create({ data });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    return await this.databaseService.todo.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.todo.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.databaseService.todo.update({
      where: { id },
      data: {
        ...updateTodoDto,
      },
    });
  }

  async remove(id: number) {
    return await this.databaseService.todo.delete({
      where: { id },
    });
  }
}
