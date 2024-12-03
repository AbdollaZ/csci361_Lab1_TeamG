import { Product } from '../product/product.entity';
export declare class Farmer {
    farmer_id: number;
    farmer_name: string;
    farmer_surname: string;
    farmer_email: string;
    phone_number: string;
    gov_id: string;
    crops?: string;
    profile_image?: string;
    farm_location?: string;
    farm_name: string;
    password: string;
    products: Product[];
}
