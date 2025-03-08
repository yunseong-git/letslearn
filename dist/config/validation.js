"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.configValidationSchema = joi_1.default.object({
    JWT_SECRET: joi_1.default.string().required(),
    DATABASE_URL: joi_1.default.string().required(),
});
//# sourceMappingURL=validation.js.map