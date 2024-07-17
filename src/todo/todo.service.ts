/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTodoDto: CreateTodoDto, email:string) {
    try {
      const data: Prisma.TodoCreateInput = {
        description: createTodoDto.description,
        task: createTodoDto.task,
        status: 'Active',
        user: {
          connect: {
            email: email,
          },
        },
      };
      console.log('input : ', data);
      return await this.databaseService.todo.create({ data });
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  async findAll(userEmail: string) {
    try {
      return await this.databaseService.todo.findMany({
        where: {
          userEmail: userEmail,
        },
      });
    } catch (error) {
      console.error('Error finding todos:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseService.todo.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Error finding todo:', error);
      throw error;
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      return await this.databaseService.todo.update({
        where: { id },
        data: {
          ...updateTodoDto,
        },
      });
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.todo.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}
