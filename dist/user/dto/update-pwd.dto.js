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
exports.UpdatePwdDto = void 0;
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../../common/validators/match.decorator"); // 커스텀 데코레이터 추가
class UpdatePwdDto {
}
exports.UpdatePwdDto = UpdatePwdDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '필수 입력 항목입니다.' }),
    (0, class_validator_1.MinLength)(10, { message: '비밀번호는 최소 10자리 이상이어야 합니다.' }),
    (0, class_validator_1.MaxLength)(18, { message: '비밀번호는 18자리 미만이어야 합니다.' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/, {
        message: '비밀번호는 최소 하나의 소문자, 숫자, 특수문자를 포함해야 합니다.',
    }),
    __metadata("design:type", String)
], UpdatePwdDto.prototype, "new_password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '필수 입력 항목입니다.' }),
    (0, class_validator_1.Validate)(match_decorator_1.Match, ['new_password'], {
        message: '비밀번호 확인이 일치하지 않습니다.',
    }),
    __metadata("design:type", String)
], UpdatePwdDto.prototype, "check_password", void 0);
//# sourceMappingURL=update-pwd.dto.js.map