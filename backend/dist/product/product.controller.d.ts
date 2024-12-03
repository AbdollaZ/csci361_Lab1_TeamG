import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(farmerId: number, createProductDto: CreateProductDto): Promise<Product>;
    updateProduct(productId: number, farmerId: number, updateProductDto: UpdateProductDto): Promise<Product>;
    deleteProduct(productId: number, farmerId: number): Promise<void>;
    findProductsByFarmer(farmerId: number): Promise<Product[]>;
    findProductsByCategory(category: string): Promise<Product[]>;
    getUniqueCategories(): Promise<string[]>;
}
