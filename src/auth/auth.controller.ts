/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
// import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: RegisterUserDto) {
    return this.authService.register(createAuthDto);
  }
  
  
  @Get()
  login(@Body() loginData: LoginDto){
    return this.authService.login(loginData)
  }


}
