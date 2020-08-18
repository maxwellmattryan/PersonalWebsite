import { Module } from '@nestjs/common';

import { ApiController } from '@api/controllers';
import { ApiService } from '@api/services';

@Module({
    imports: [],
    controllers: [
        ApiController
    ],
    providers: [
        ApiService
    ],
})
export class AppModule { }
