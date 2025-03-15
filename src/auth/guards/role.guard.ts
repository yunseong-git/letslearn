import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true; // 역할 제한이 없으면 모두 접근 가능

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('🚀 요청 유저 정보:', user); // ✅ 디버깅 추가!

    // ✅ ADMIN이면 항상 허용되도록 수정!
    if (user && user.role === 'ADMIN') {
      console.log('✅ ADMIN 유저 접근 허용');
      return true;
    }

    if (!user || !requiredRoles.includes(user.role)) {
      console.log('❌ 권한 부족으로 차단됨');
      throw new ForbiddenException('권한이 없습니다.');
    }

    return true;
  }
}