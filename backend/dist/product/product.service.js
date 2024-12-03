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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
const farmer_entity_1 = require("../farmer/farmer.entity");
let ProductService = class ProductService {
    constructor(productRepository, farmerRepository) {
        this.productRepository = productRepository;
        this.farmerRepository = farmerRepository;
    }
    async createProduct(farmerId, productData) {
        const farmer = await this.farmerRepository.findOne({
            where: { farmer_id: farmerId },
        });
        if (!farmer) {
            throw new common_1.NotFoundException(`Farmer with ID ${farmerId} not found`);
        }
        const product = this.productRepository.create({
            ...productData,
            farmer,
        });
        return this.productRepository.save(product);
    }
    async updateProduct(productId, farmerId, updateData) {
        const product = await this.productRepository.findOne({
            where: { product_id: productId, farmer: { farmer_id: farmerId } },
            relations: ['farmer'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found for Farmer with ID ${farmerId}`);
        }
        Object.assign(product, updateData);
        return this.productRepository.save(product);
    }
    async findUniqueCategories() {
        const categories = await this.productRepository
            .createQueryBuilder('product')
            .select('DISTINCT product.product_category', 'category')
            .getRawMany();
        return categories.map((row) => row.category);
    }
    async deleteProduct(productId, farmerId) {
        const product = await this.productRepository.findOne({
            where: { product_id: productId, farmer: { farmer_id: farmerId } },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found for Farmer with ID ${farmerId}`);
        }
        await this.productRepository.remove(product);
    }
    async findProductsByFarmer(farmerId) {
        return this.productRepository.find({
            where: { farmer: { farmer_id: farmerId } },
        });
    }
    async findProductsByCategory(category) {
        return this.productRepository.find({
            where: { product_category: category },
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(farmer_entity_1.Farmer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map