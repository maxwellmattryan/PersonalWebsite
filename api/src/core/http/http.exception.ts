import { HttpException } from '@nestjs/common';

export class InternalServerErrorException extends HttpException {
    constructor() {
        super('Oops! Something went wrong on the server side.', 500);
    }
}