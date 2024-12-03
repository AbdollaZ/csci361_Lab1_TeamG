import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        userType: 'farmer' | 'buyer';
        [key: string]: any;
    }): Promise<import("../farmer/farmer.entity").Farmer | import("../buyer/buyer.entity").Buyer>;
    login(body: LoginDto): Promise<{
        accessToken: string;
        id: number;
        role: "farmer" | "buyer";
        user: import("../farmer/farmer.entity").Farmer | import("../buyer/buyer.entity").Buyer;
    }>;
}
