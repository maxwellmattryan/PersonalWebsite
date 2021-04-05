"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const bull_1 = require("@nestjs/bull");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const utils_module_1 = require("../../core/utils/utils.module");
const mail_processor_1 = require("./mail.processor");
const mail_service_1 = require("./mail.service");
let MailModule = class MailModule {
};
MailModule = __decorate([
    common_1.Module({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        host: process.env.MAILER_HOST,
                        port: process.env.MAILER_PORT,
                        secure: true,
                        auth: {
                            user: process.env.MAILER_USER,
                            pass: process.env.MAILER_PASS
                        }
                    },
                    defaults: {
                        from: `mattmaxwell.dev <${process.env.MAILER_USER}@gmail.com>`
                    },
                    template: {
                        dir: __dirname + '/templates',
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        }
                    }
                })
            }),
            bull_1.BullModule.registerQueueAsync({
                name: process.env.REDIS_NAME,
                useFactory: () => ({
                    redis: process.env.REDIS_URL
                })
            }),
            utils_module_1.UtilsModule
        ],
        exports: [
            bull_1.BullModule,
            mail_service_1.MailService
        ],
        controllers: [],
        providers: [
            mail_service_1.MailService,
            mail_processor_1.MailProcessor
        ]
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map