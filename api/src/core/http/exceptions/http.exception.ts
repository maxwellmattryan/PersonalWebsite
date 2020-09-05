import { HttpException } from '@nestjs/common';

export class InternalServerErrorException extends HttpException {
    constructor(
        msg: string = 'Oops! Something went wrong on the server side.'
    ) {
        super(msg, 500);
    }
}