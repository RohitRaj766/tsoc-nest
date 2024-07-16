/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  task: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEmail()
  userEmail: string;
}


