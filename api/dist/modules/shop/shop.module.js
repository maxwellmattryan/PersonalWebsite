"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const gcloud_module_1 = require("../../core/gcloud/gcloud.module");
const mail_module_1 = require("../mail/mail.module");
const shop_category_controller_1 = require("./controllers/shop-category.controller");
const shop_checkout_controller_1 = require("./controllers/shop-checkout.controller");
const shop_customer_controller_1 = require("./controllers/shop-customer.controller");
const shop_order_controller_1 = require("./controllers/shop-order.controller");
const shop_product_controller_1 = require("./controllers/shop-product.controller");
const shop_product_status_controller_1 = require("./controllers/shop-product-status.controller");
const shop_category_entity_1 = require("./entities/shop-category.entity");
const shop_customer_entity_1 = require("./entities/shop-customer.entity");
const shop_order_entity_1 = require("./entities/shop-order.entity");
const shop_product_entity_1 = require("./entities/shop-product.entity");
const shop_product_status_entity_1 = require("./entities/shop-product-status.entity");
const shop_category_service_1 = require("./services/shop-category.service");
const shop_checkout_service_1 = require("./services/shop-checkout.service");
const shop_customer_service_1 = require("./services/shop-customer.service");
const shop_order_service_1 = require("./services/shop-order.service");
const shop_product_service_1 = require("./services/shop-product.service");
const shop_product_status_service_1 = require("./services/shop-product-status.service");
let ShopModule = class ShopModule {
};
ShopModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            gcloud_module_1.GCloudModule,
            common_1.HttpModule,
            mail_module_1.MailModule,
            typeorm_1.TypeOrmModule.forFeature([shop_category_entity_1.ShopCategory, shop_customer_entity_1.ShopCustomer, shop_order_entity_1.ShopOrder, shop_product_entity_1.ShopProduct, shop_product_status_entity_1.ShopProductStatus])
        ],
        exports: [],
        controllers: [
            shop_category_controller_1.ShopCategoryController,
            shop_checkout_controller_1.ShopCheckoutController,
            shop_customer_controller_1.ShopCustomerController,
            shop_order_controller_1.ShopOrderController,
            shop_product_controller_1.ShopProductController,
            shop_product_status_controller_1.ShopProductStatusController
        ],
        providers: [
            shop_category_service_1.ShopCategoryService,
            shop_checkout_service_1.ShopCheckoutService,
            shop_customer_service_1.ShopCustomerService,
            shop_order_service_1.ShopOrderService,
            shop_product_service_1.ShopProductService,
            shop_product_status_service_1.ShopProductStatusService
        ]
    })
], ShopModule);
exports.ShopModule = ShopModule;
//# sourceMappingURL=shop.module.js.map