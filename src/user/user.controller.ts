import { Controller, UseGuards, Get, Patch, Param, Body, Request } from '@nestjs/common';
import { UserService } from './user.service';

import { Role } from '@prisma/client';
import { Roles } from 'common/validators/roles.decorator';

import { RoleGuard } from 'auth/guards/role.guard';
import { JwtAuthGuard } from 'auth/guards/auth.guard';

import { UpdatePwdDto } from './dto/update-pwd.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  /**모든 사용자 조회 */
  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  /**id 사용자 조회 */
  @Get('by-id/:id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(Number(id));
  }

  /**email 사용자 조회 */
  @Get('by-email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  /**사용자 비밀번호 변경 */
  @Patch('pwd')
  @UseGuards(JwtAuthGuard)
  async updatePwd(@Request() req, @Body() updatePwdDto: UpdatePwdDto) {
    const userId = req.user.id; // JWT에서 유저 ID 추출
    return this.userService.updatePwd(userId, updatePwdDto.new_password);
  }


  /**사용자 권한 변경 */
  @Patch(':id/role/tutor')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN') // Admin만 유저를 Tutor로 변경 가능
  async promoteToTutor(@Param('id') id: string) {
    return this.userService.updateUserRole(Number(id), Role.TUTOR);
  }
}