import { Repository } from 'typeorm';
import { Buyer } from './buyer.entity';
export declare class BuyerService {
    private buyerRepository;
    constructor(buyerRepository: Repository<Buyer>);
    findAll(): Promise<Buyer[]>;
    findOne(id: number): Promise<Buyer>;
    create(data: Partial<Buyer>): Promise<Buyer>;
    update(id: number, updateData: Partial<Buyer>): Promise<Buyer>;
    delete(id: number): Promise<void>;
}
