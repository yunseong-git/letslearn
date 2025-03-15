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
exports.SignupDto = void 0;
const class_validator_1 = require("class-validator");
class SignupDto {
}
exports.SignupDto = SignupDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: '올바른 이메일 형식이 아닙니다.' }),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '비밀번호는 필수 입력 항목입니다.' }),
    (0, class_validator_1.MinLength)(10, { message: '비밀번호는 최소 10자리 이상이어야 합니다.' }),
    (0, class_validator_1.MaxLength)(18, { message: '비밀번호는 18자리 미만이어야 합니다.' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/, {
        message: '비밀번호는 최소 하나의 소문자, 숫자, 특수문자를 포함해야 합니다.',
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '이름은 필수 입력 항목입니다.' }),
    __metadata("design:type", String)
], SignupDto.prototype, "name", void 0);
//# sourceMappingURL=signup.dto.js.map