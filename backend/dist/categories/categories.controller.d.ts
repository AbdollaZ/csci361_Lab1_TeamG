import { ProductService } from '../product/product.service';
export declare class CategoriesController {
    private readonly productService;
    constructor(productService: ProductService);
    getUniqueCategories(): Promise<string[]>;
}
