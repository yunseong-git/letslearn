import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from 'auth/guards/auth.guard';
import { RoleGuard } from 'auth/guards/role.guard';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './common/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from 'auth/auth.module';
import { ClassModule } from 'class/class.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 전역으로 환경변수 설정
    PrismaModule,
    UserModule,
    AuthModule,
    ClassModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // ✅ `JwtAuthGuard`를 전역 가드로 설정!
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule { }