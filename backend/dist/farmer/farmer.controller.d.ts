import { FarmerService } from './farmer.service';
import { Farmer } from './farmer.entity';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
export declare class FarmerController {
    private readonly farmerService;
    constructor(farmerService: FarmerService);
    findAll(): Promise<Farmer[]>;
    findOne(id: number): Promise<Farmer>;
    create(farmer: Partial<Farmer>): Promise<Farmer>;
    update(id: number, updateData: UpdateFarmerDto, profile_image?: Express.Multer.File): Promise<Farmer>;
    delete(id: number): Promise<void>;
}
