import { Id } from '@ui/core/models/model';
import { Deserializable } from '@ui/core/models/deserializable.model';

export class PortfolioProfileStatus implements Deserializable {
    constructor(partial: Partial<PortfolioProfileStatus>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    id?: Id;

    status: string;
}
