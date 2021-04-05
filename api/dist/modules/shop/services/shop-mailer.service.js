"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopMailerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
let ShopMailerService = class ShopMailerService {
    constructor(configService, mailerService) {
        this.configService = configService;
        this.mailerService = mailerService;
    }
    sendTest() {
        this.mailerService.sendMail({
            to: 'maxwellmattryan@gmail.com',
            from: `${this.configService.get('MAILER_USER')}@gmail.com`,
            subject: 'Testing NestJS Mailer Module',
            text: 'Hello!',
            html: `<br>Hello!</br>`
        })
            .then(() => { })
            .catch((err) => { console.log(err); });
    }
};
ShopMailerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mailer_1.MailerService])
], ShopMailerService);
exports.ShopMailerService = ShopMailerService;
//# sourceMappingURL=shop-mailer.service.js.map