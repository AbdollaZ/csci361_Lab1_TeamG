import { Repository } from 'typeorm';
import { Farmer } from '../farmer/farmer.entity';
import { Buyer } from '../buyer/buyer.entity';
import { RegisterFarmerDto } from './dto/register-farmer.dto';
import { RegisterBuyerDto } from './dto/register-buyer.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private farmerRepository;
    private buyerRepository;
    private readonly jwtService;
    constructor(farmerRepository: Repository<Farmer>, buyerRepository: Repository<Buyer>, jwtService: JwtService);
    registerFarmer(registerFarmerDto: RegisterFarmerDto): Promise<Farmer>;
    registerBuyer(registerBuyerDto: RegisterBuyerDto): Promise<Buyer>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        id: number;
        role: "farmer" | "buyer";
        user: Farmer | Buyer;
    }>;
}
