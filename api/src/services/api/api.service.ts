import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
    getIndex(): string {
        return 'Welcome to the API!';
    }
}
