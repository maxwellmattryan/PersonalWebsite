import { Deserializable } from '@app/shared/models/deserializable.model';

export class PortfolioProfileTechnology implements Deserializable {
    constructor(partial: Partial<PortfolioProfileTechnology>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    id?: number;

    name: string;
    display_order: number;
}