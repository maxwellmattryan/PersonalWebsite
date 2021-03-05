import { BadRequestException } from "@nestjs/common";

export class InvalidEntityPropertyException extends BadRequestException {
    constructor() {
        super('The specified property does not exist on this entity type.');
    }
}
