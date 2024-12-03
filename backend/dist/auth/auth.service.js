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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const farmer_entity_1 = require("../farmer/farmer.entity");
const buyer_entity_1 = require("../buyer/buyer.entity");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(farmerRepository, buyerRepository, jwtService) {
        this.farmerRepository = farmerRepository;
        this.buyerRepository = buyerRepository;
        this.jwtService = jwtService;
    }
    async registerFarmer(registerFarmerDto) {
        const { farmer_email, password } = registerFarmerDto;
        const existingFarmer = await this.farmerRepository.findOneBy({
            farmer_email,
        });
        if (existingFarmer) {
            throw new common_1.ConflictException('Farmer with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const farmer = this.farmerRepository.create({
            ...registerFarmerDto,
            password: hashedPassword,
        });
        return this.farmerRepository.save(farmer);
    }
    async registerBuyer(registerBuyerDto) {
        const { email, password } = registerBuyerDto;
        const existingBuyer = await this.buyerRepository.findOneBy({ email });
        if (existingBuyer) {
            throw new common_1.ConflictException('Buyer with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const buyer = this.buyerRepository.create({
            ...registerBuyerDto,
            password: hashedPassword,
        });
        return this.buyerRepository.save(buyer);
    }
    async login(loginDto) {
        const { email, password, userType } = loginDto;
        let user;
        if (userType === 'farmer') {
            user = await this.farmerRepository.findOneBy({ farmer_email: email });
        }
        else if (userType === 'buyer') {
            user = await this.buyerRepository.findOneBy({ email });
        }
        else {
            throw new common_1.UnauthorizedException('Invalid user type');
        }
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            id: userType === 'farmer'
                ? user.farmer_id
                : user.buyer_id,
            email: userType === 'farmer'
                ? user.farmer_email
                : user.email,
            role: userType,
        };
        const token = this.jwtService.sign(payload);
        return { accessToken: token, id: payload.id, role: userType, user };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(farmer_entity_1.Farmer)),
    __param(1, (0, typeorm_2.InjectRepository)(buyer_entity_1.Buyer)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map