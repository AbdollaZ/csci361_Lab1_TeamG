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
exports.Buyer = void 0;
const typeorm_1 = require("typeorm");
let Buyer = class Buyer {
};
exports.Buyer = Buyer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Buyer.prototype, "buyer_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Buyer.prototype, "buyer_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Buyer.prototype, "buyer_surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Buyer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], Buyer.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Buyer.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Buyer.prototype, "password", void 0);
exports.Buyer = Buyer = __decorate([
    (0, typeorm_1.Entity)('buyer'),
    (0, typeorm_1.Unique)(['email', 'phone_number'])
], Buyer);
//# sourceMappingURL=buyer.entity.js.map