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
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let RoleGuard = class RoleGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.get('roles', context.getHandler());
        if (!requiredRoles)
            return true; // 역할 제한이 없으면 모두 접근 가능
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
            throw new common_1.ForbiddenException('권한이 없습니다.');
        }
        return true;
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RoleGuard);
//# sourceMappingURL=role.guard.js.map