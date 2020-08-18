import { Controller, Get } from '@nestjs/common';
import { ApiService } from '@api/services';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) { }

    @Get()
    getIndex(): string {
        return this.apiService.getIndex();
    }
}
