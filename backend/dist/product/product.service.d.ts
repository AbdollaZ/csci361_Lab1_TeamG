import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Farmer } from '../farmer/farmer.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private productRepository;
    private farmerRepository;
    constructor(productRepository: Repository<Product>, farmerRepository: Repository<Farmer>);
    createProduct(farmerId: number, productData: CreateProductDto): Promise<Product>;
    updateProduct(productId: number, farmerId: number, updateData: UpdateProductDto): Promise<Product>;
    findUniqueCategories(): Promise<string[]>;
    deleteProduct(productId: number, farmerId: number): Promise<void>;
    findProductsByFarmer(farmerId: number): Promise<Product[]>;
    findProductsByCategory(category: string): Promise<Product[]>;
}
