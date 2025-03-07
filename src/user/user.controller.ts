import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    return this.userService.createUser(email, password, name);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(Number(id));
  }
}