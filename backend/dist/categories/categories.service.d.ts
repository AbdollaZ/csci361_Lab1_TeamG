import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
export declare class CategoriesService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    getUniqueCategories(): Promise<string[]>;
    getProductsByCategory(category: string): Promise<Product[]>;
}
