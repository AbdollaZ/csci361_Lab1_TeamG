import { Repository } from 'typeorm';
import { Farmer } from './farmer.entity';
export declare class FarmerService {
    private farmerRepository;
    constructor(farmerRepository: Repository<Farmer>);
    findAll(): Promise<Farmer[]>;
    findOne(id: number): Promise<Farmer>;
    create(farmer: Partial<Farmer>): Promise<Farmer>;
    update(id: number, updateData: Partial<Farmer>, profileImagePath?: string): Promise<Farmer>;
    delete(id: number): Promise<void>;
}
