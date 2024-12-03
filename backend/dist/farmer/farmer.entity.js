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
exports.Farmer = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../product/product.entity");
let Farmer = class Farmer {
};
exports.Farmer = Farmer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Farmer.prototype, "farmer_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Farmer.prototype, "farmer_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Farmer.prototype, "farmer_surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Farmer.prototype, "farmer_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], Farmer.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Farmer.prototype, "gov_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Farmer.prototype, "crops", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Farmer.prototype, "profile_image", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Farmer.prototype, "farm_location", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Farmer.prototype, "farm_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Farmer.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.farmer, { cascade: true }),
    __metadata("design:type", Array)
], Farmer.prototype, "products", void 0);
exports.Farmer = Farmer = __decorate([
    (0, typeorm_1.Entity)('farmer'),
    (0, typeorm_1.Unique)(['farmer_email', 'phone_number'])
], Farmer);
//# sourceMappingURL=farmer.entity.js.map