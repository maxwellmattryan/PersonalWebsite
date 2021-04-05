import { BadRequestException, NotFoundException } from '@nestjs/common';
export declare class PortfolioProjectAlreadyExistsException extends BadRequestException {
    constructor();
}
export declare class PortfolioProjectCouldNotBeUpdatedException extends BadRequestException {
    constructor();
}
export declare class PortfolioProjectWasNotFoundException extends NotFoundException {
    constructor();
}
export declare class PortfolioProjectsWereNotFoundException extends NotFoundException {
    constructor();
}
