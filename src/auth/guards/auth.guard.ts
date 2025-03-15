import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'common/validators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super(); //부모 생성자(AuthGuard) 호출
  }

  //@public 예외 처리
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), //API 엔드포인트 별 설정
      context.getClass(), //컨트롤러 전체 설정
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }


  handleRequest(err, user, info) {
    console.log('🚀 JwtAuthGuard 실행됨');
    console.log('🚀 유저 정보:', user);

    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('토큰이 만료되었습니다.');
      } else if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('유효하지 않은 토큰입니다.');
      }
      throw new UnauthorizedException('인증 실패');
    }
    return user;
  }
}