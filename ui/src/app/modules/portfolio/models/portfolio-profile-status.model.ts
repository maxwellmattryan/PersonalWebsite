import { Deserializable } from '@ui/shared/models/deserializable.model';

export class PortfolioProfileStatus implements Deserializable {
    constructor(partial: Partial<PortfolioProfileStatus>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    id?: number;

    status: string;
}
