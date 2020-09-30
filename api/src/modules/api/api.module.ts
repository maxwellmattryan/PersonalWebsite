import { Module } from '@nestjs/common';

import { BlogModule } from '@api/modules/blog/blog.module';
import { PortfolioModule } from '@api/modules/portfolio/portfolio.module';

import { ApiController } from './controllers/api.controller';

@Module({
    imports: [
        BlogModule,
        PortfolioModule
    ],
    exports: [],
    controllers: [ApiController],
    providers: []
})
export class ApiModule { }