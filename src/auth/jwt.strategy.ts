import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ✅ Bearer 토큰에서 JWT 추출
      ignoreExpiration: false, // ✅ 토큰 만료 확인
      secretOrKey: configService.get<string>('JWT_SECRET')!, // ✅ .env에서 JWT_SECRET 가져오기
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role }; // ✅ req.user에 저장되는 값
  }
}