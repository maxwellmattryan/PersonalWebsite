import { Module } from '@nestjs/common';

import { BlogModule } from '@api/features/blog/blog.module';
import { PortfolioModule } from '@api/features/portfolio/portfolio.module';

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