import { Farmer } from '../farmer/farmer.entity';
export declare class Product {
    product_id: number;
    farmer: Farmer;
    product_name: string;
    product_description: string;
    product_price: number;
    product_quantity: number;
    product_image?: string;
    product_category: string;
}
