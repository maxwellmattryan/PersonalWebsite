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
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const Joi = require("@hapi/joi");
const auth_module_1 = require("./core/auth/auth.module");
const database_module_1 = require("./core/database/database.module");
const gcloud_module_1 = require("./core/gcloud/gcloud.module");
const http_module_1 = require("./core/http/http.module");
const utils_module_1 = require("./core/utils/utils.module");
const admin_module_1 = require("./modules/admin/admin.module");
const api_module_1 = require("./modules/api/api.module");
const blog_module_1 = require("./modules/blog/blog.module");
const file_module_1 = require("./modules/file/file.module");
const portfolio_module_1 = require("./modules/portfolio/portfolio.module");
const shop_module_1 = require("./modules/shop/shop.module");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            common_1.CacheModule.register({
                ttl: 60
            }),
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    BASE_URL: Joi.string().required(),
                    API_URL: Joi.string().required(),
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.number().required(),
                    DB_USER: Joi.string().required(),
                    DB_PASS: Joi.string().required(),
                    DB_NAME: Joi.string().required(),
                    GCLOUD_CREDENTIALS: Joi.string().required(),
                    GCLOUD_ASSETS_STORAGE_BUCKET: Joi.string().required(),
                    GCLOUD_PRODUCTS_STORAGE_BUCKET: Joi.string().required(),
                    STRIPE_API_URL: Joi.string().required(),
                    STRIPE_SK: Joi.string().required(),
                    STRIPE_PK: Joi.string().required(),
                    STRIPE_TAX_RATE_ID: Joi.string().required(),
                    MAILER_HOST: Joi.string().required(),
                    MAILER_PORT: Joi.string().required(),
                    MAILER_USER: Joi.string().required(),
                    MAILER_PASS: Joi.string().required(),
                    REDIS_HOST: Joi.string().required(),
                    REDIS_PORT: Joi.string().required(),
                    REDIS_PASS: Joi.string().required(),
                    REDIS_NAME: Joi.string().required(),
                    JWT_SECRET: Joi.string().required(),
                    JWT_EXPIRES_IN: Joi.string().required()
                })
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 20
            }),
            auth_module_1.AuthModule,
            database_module_1.DatabaseModule,
            gcloud_module_1.GCloudModule,
            http_module_1.HttpModule,
            utils_module_1.UtilsModule,
            admin_module_1.AdminModule,
            api_module_1.ApiModule,
            blog_module_1.BlogModule,
            file_module_1.FileModule,
            portfolio_module_1.PortfolioModule,
            shop_module_1.ShopModule
        ],
        exports: [],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.CacheInterceptor
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map