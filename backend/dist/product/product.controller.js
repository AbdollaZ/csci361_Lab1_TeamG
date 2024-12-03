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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(farmerId, createProductDto) {
        return this.productService.createProduct(farmerId, createProductDto);
    }
    async updateProduct(productId, farmerId, updateProductDto) {
        return this.productService.updateProduct(productId, farmerId, updateProductDto);
    }
    async deleteProduct(productId, farmerId) {
        return this.productService.deleteProduct(productId, farmerId);
    }
    async findProductsByFarmer(farmerId) {
        return this.productService.findProductsByFarmer(farmerId);
    }
    async findProductsByCategory(category) {
        return this.productService.findProductsByCategory(category);
    }
    async getUniqueCategories() {
        return this.productService.findUniqueCategories();
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)('/farmer/:farmerId'),
    __param(0, (0, common_1.Param)('farmerId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)('/:productId/farmer/:farmerId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('farmerId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('/:productId/farmer/:farmerId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('farmerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)('/farmer/:farmerId'),
    __param(0, (0, common_1.Param)('farmerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findProductsByFarmer", null);
__decorate([
    (0, common_1.Get)('/categories/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findProductsByCategory", null);
__decorate([
    (0, common_1.Get)('/categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getUniqueCategories", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map