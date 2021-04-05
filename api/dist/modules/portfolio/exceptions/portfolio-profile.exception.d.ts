import { BadRequestException, NotFoundException } from '@nestjs/common';
export declare class ActivePortfolioProfileWasNotFoundException extends NotFoundException {
    constructor();
}
export declare class PortfolioProfileWasNotFoundException extends NotFoundException {
    constructor();
}
export declare class PortfolioProfilesWereNotFoundException extends NotFoundException {
    constructor();
}
export declare class PortfolioProfileCouldNotBeUpdatedException extends BadRequestException {
    constructor();
}
export declare class PortfolioProfileAlreadyExistsException extends BadRequestException {
    constructor();
}
