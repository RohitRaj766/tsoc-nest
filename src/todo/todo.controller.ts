/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserEmail } from '../common/decorator/user-email.decorators';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:'Add a new todo.', summary:'Add new task.'})
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @UserEmail()
  userEmail:string) {
    return this.todoService.create(createTodoDto,userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:'Get user specific task.', summary:'get all tasks.'})
  @Get()
  findAll(
    @UserEmail()
    userEmail:string
  ) {
    console.log("suer Email : ", userEmail)
    return this.todoService.findAll(userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:'find user specific task.', summary:'Update user task.'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:'update user specific task.', summary:'Update user task.'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:'delete user specific task.', summary:'delete user task.'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}

export default TodoController;
