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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("./class.service");
const create_class_dto_1 = require("./dto/create-class.dto");
const update_class_dto_1 = require("./dto/update-class.dto");
const roles_decorator_1 = require("../common/validators/roles.decorator");
let ClassController = class ClassController {
    constructor(classService) {
        this.classService = classService;
    }
    /** 강의 생성 */
    createClass(req, createClassDto) {
        return this.classService.createClass(createClassDto, req.user.id);
    }
    /** 강의 목록 조회 */
    getClasses() {
        return this.classService.getClasses();
    }
    /** 특정 강의 조회 */
    getClassById(id) {
        return this.classService.getClassById(Number(id));
    }
    /** 강의 수정 */
    updateClass(id, updateClassDto) {
        return this.classService.updateClass(Number(id), updateClassDto);
    }
    /** 강의 삭제 */
    deleteClass(id) {
        return this.classService.deleteClass(Number(id));
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('TUTOR') // ✅ TUTOR만 가능!
    ,
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_class_dto_1.CreateClassDto]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "createClass", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "getClasses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "getClassById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('TUTOR') // ✅ TUTOR만 가능!
    ,
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_class_dto_1.UpdateClassDto]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "updateClass", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('TUTOR') // ✅ TUTOR만 가능!
    ,
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "deleteClass", null);
exports.ClassController = ClassController = __decorate([
    (0, common_1.Controller)('classes'),
    __metadata("design:paramtypes", [class_service_1.ClassService])
], ClassController);
//# sourceMappingURL=class.controller.js.map