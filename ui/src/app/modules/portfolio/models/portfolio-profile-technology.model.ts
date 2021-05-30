import { Id } from '@ui/core/models/model';
import { Deserializable } from '@ui/core/models/deserializable.model';

export class PortfolioProfileTechnology implements Deserializable {
    constructor(partial: Partial<PortfolioProfileTechnology>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    id?: Id;

    name: string;
    display_order: number;
}
