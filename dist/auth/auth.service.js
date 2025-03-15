"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const prisma_service_1 = require("../common/prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, userService, jwtService) {
        this.prisma = prisma;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    validateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmail(email);
            if (!user)
                throw new common_1.UnauthorizedException('이메일이 존재하지 않습니다.');
            const isPasswordValid = yield bcrypt.compare(password, user.password);
            if (!isPasswordValid)
                throw new common_1.UnauthorizedException('비밀번호가 틀렸습니다.');
            return { id: user.id, email: user.email, role: user.role };
        });
    }
    signup(email, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            //중복확인
            const existingUser = yield this.userService.getUserByEmail(email);
            if (existingUser) {
                throw new common_1.UnauthorizedException('이미 존재하는 이메일입니다.');
            }
            const hashedPassword = yield bcrypt.hash(password, 12);
            const user = yield this.prisma.user.create({
                data: { email, password: hashedPassword, name },
            });
            const payload = { email: user.email, id: user.id, role: user.role };
            return {
                message: '회원가입 성공',
                access_token: this.jwtService.sign(payload),
            };
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { email: user.email, id: user.id, role: user.role };
            console.log('🚀 JWT 발급 Payload:', payload); // ✅ 디버깅 추가!
            return { access_token: this.jwtService.sign(payload) };
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map