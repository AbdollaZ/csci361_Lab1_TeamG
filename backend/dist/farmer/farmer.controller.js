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
exports.FarmerController = void 0;
const common_1 = require("@nestjs/common");
const farmer_service_1 = require("./farmer.service");
const multer_1 = require("multer");
const path_1 = require("path");
const update_farmer_dto_1 = require("./dto/update-farmer.dto");
const platform_express_1 = require("@nestjs/platform-express");
let FarmerController = class FarmerController {
    constructor(farmerService) {
        this.farmerService = farmerService;
    }
    async findAll() {
        return this.farmerService.findAll();
    }
    async findOne(id) {
        return this.farmerService.findOne(id);
    }
    async create(farmer) {
        return this.farmerService.create(farmer);
    }
    async update(id, updateData, profile_image) {
        const imagePath = profile_image?.path || null;
        return this.farmerService.update(id, updateData, imagePath);
    }
    async delete(id) {
        return this.farmerService.delete(id);
    }
};
exports.FarmerController = FarmerController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FarmerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FarmerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FarmerController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/profile/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profile_image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/avatars',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `avatar-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_farmer_dto_1.UpdateFarmerDto, Object]),
    __metadata("design:returntype", Promise)
], FarmerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FarmerController.prototype, "delete", null);
exports.FarmerController = FarmerController = __decorate([
    (0, common_1.Controller)('farmers'),
    __metadata("design:paramtypes", [farmer_service_1.FarmerService])
], FarmerController);
//# sourceMappingURL=farmer.controller.js.map