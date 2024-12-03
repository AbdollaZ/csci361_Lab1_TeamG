"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const farmer_module_1 = require("./farmer/farmer.module");
const buyer_module_1 = require("./buyer/buyer.module");
const product_module_1 = require("./product/product.module");
const categories_module_1 = require("./categories/categories.module");
const farmer_entity_1 = require("./farmer/farmer.entity");
const product_entity_1 = require("./product/product.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: 'postgresql://ainura:HhrH4pqsg0ySh8u7QrnI9pFaUWXvNnFq@dpg-ct68t2l6l47c7381pc80-a.oregon-postgres.render.com:5432/db_ce3j',
                autoLoadEntities: true,
                synchronize: true,
                entities: [product_entity_1.Product, farmer_entity_1.Farmer],
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
            auth_module_1.AuthModule,
            farmer_module_1.FarmerModule,
            buyer_module_1.BuyerModule,
            product_module_1.ProductModule,
            categories_module_1.CategoriesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map