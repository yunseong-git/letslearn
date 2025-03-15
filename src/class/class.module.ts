import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { PrismaModule } from '../common/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule], // ✅ DB & 인증 모듈 추가
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}