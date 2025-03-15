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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.user.findMany();
            }
            catch (error) {
                console.error('Error fetching users:', error);
                throw new Error('Failed to fetch users');
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error('User ID is required');
            }
            try {
                return yield this.prisma.user.findUnique({
                    where: { id },
                });
            }
            catch (error) {
                console.error('Error fetching user by ID:', error);
                throw new Error('Failed to retrieve user');
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const lowerCaseEmail = email.toLowerCase(); // 이메일 소문자 변환
            try {
                return yield this.prisma.user.findUnique({
                    where: { email: lowerCaseEmail },
                });
            }
            catch (error) {
                console.error('Error fetching user by email:', error);
                throw new Error('Failed to retrieve user');
            }
        });
    }
    updatePwd(id, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || !newPassword) {
                throw new Error('User ID and new password are required.');
            }
            const user = yield this.prisma.user.findUnique({ where: { id } });
            if (!user) {
                throw new Error('User not found.');
            }
            const hashedPassword = yield bcrypt.hash(newPassword, 12);
            try {
                return yield this.prisma.user.update({
                    where: { id },
                    data: { password: hashedPassword }
                });
            }
            catch (error) {
                console.error('updatePwd service error:', error);
                throw new Error('Failed to update password');
            }
        });
    }
    updateUserRole(userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.update({
                where: { id: userId },
                data: { role },
            });
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map