import { BuyerService } from './buyer.service';
import { Buyer } from './buyer.entity';
import { ProductService } from '../product/product.service';
export declare class BuyerController {
    private readonly productService;
    private readonly buyerService;
    constructor(productService: ProductService, buyerService: BuyerService);
    findAll(): Promise<Buyer[]>;
    findOne(id: number): Promise<Buyer>;
    create(buyer: Partial<Buyer>): Promise<Buyer>;
    getCategoriesForBuyer(): Promise<string[]>;
    update(id: number, updateData: Partial<Buyer>): Promise<Buyer>;
    delete(id: number): Promise<void>;
}
