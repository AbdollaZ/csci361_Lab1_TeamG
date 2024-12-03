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
exports.RegisterBuyerDto = void 0;
const class_validator_1 = require("class-validator");
class RegisterBuyerDto {
}
exports.RegisterBuyerDto = RegisterBuyerDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Buyer name is required' }),
    __metadata("design:type", String)
], RegisterBuyerDto.prototype, "buyer_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Buyer surname is required' }),
    __metadata("design:type", String)
], RegisterBuyerDto.prototype, "buyer_surname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], RegisterBuyerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone number is required' }),
    __metadata("design:type", String)
], RegisterBuyerDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Address is required' }),
    __metadata("design:type", String)
], RegisterBuyerDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    __metadata("design:type", String)
], RegisterBuyerDto.prototype, "password", void 0);
//# sourceMappingURL=register-buyer.dto.js.map