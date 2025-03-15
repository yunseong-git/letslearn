import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PrismaService } from 'common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('이메일이 존재하지 않습니다.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('비밀번호가 틀렸습니다.');

    return { id: user.id, email: user.email, role: user.role };
  }

  async signup(email: string, password: string, name: string) {

    //중복확인
    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const payload = { email: user.email, id: user.id, role: user.role };

    return {
      message: '회원가입 성공',
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id, role: user.role };
    console.log('🚀 JWT 발급 Payload:', payload); // ✅ 디버깅 추가!
    return { access_token: this.jwtService.sign(payload) };
  }
}