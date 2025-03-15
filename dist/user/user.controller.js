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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../common/validators/roles.decorator");
const role_guard_1 = require("../auth/guards/role.guard");
const auth_guard_1 = require("../auth/guards/auth.guard");
const update_pwd_dto_1 = require("./dto/update-pwd.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    /**모든 사용자 조회 */
    getUsers() {
        return this.userService.getUsers();
    }
    /**id 사용자 조회 */
    getUserById(id) {
        return this.userService.getUserById(Number(id));
    }
    /**email 사용자 조회 */
    getUserByEmail(email) {
        return this.userService.getUserByEmail(email);
    }
    /**사용자 비밀번호 변경 */
    updatePwd(req, updatePwdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id; // JWT에서 유저 ID 추출
            return this.userService.updatePwd(userId, updatePwdDto.new_password);
        });
    }
    /**사용자 권한 변경 */
    promoteToTutor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.updateUserRole(Number(id), client_1.Role.TUTOR);
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('by-id/:id'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)('by-email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserByEmail", null);
__decorate([
    (0, common_1.Patch)('pwd'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_pwd_dto_1.UpdatePwdDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePwd", null);
__decorate([
    (0, common_1.Patch)(':id/role/tutor'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN') // Admin만 유저를 Tutor로 변경 가능
    ,
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "promoteToTutor", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map