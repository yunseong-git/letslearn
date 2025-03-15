"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const public_decorator_1 = require("../../common/validators/public.decorator");
const core_1 = require("@nestjs/core");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super(); //부모 생성자(AuthGuard) 호출
        this.reflector = reflector;
    }
    //@public 예외 처리
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(), //API 엔드포인트 별 설정
            context.getClass(), //컨트롤러 전체 설정
        ]);
        if (isPublic)
            return true;
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        console.log('🚀 JwtAuthGuard 실행됨');
        console.log('🚀 유저 정보:', user);
        if (err || !user) {
            if ((info === null || info === void 0 ? void 0 : info.name) === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('토큰이 만료되었습니다.');
            }
            else if ((info === null || info === void 0 ? void 0 : info.name) === 'JsonWebTokenError') {
                throw new common_1.UnauthorizedException('유효하지 않은 토큰입니다.');
            }
            throw new common_1.UnauthorizedException('인증 실패');
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], JwtAuthGuard);
//# sourceMappingURL=auth.guard.js.map