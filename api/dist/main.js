"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const app_module_1 = require("./app.module");
const extended_logger_1 = require("./core/utils/extended-logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(app.get(extended_logger_1.ExtendedLogger));
    app.enableCors({
        origin: true,
        methods: 'GET,POST,PUT,DELETE,BATCH,OPTIONS',
        credentials: true
    });
    app.use(cookieParser(process.env.JWT_SECRET));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.use(compression());
    app.use(helmet());
    app.setGlobalPrefix('api');
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map