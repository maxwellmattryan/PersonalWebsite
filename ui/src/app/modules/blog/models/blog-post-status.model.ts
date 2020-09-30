import { Deserializable } from '@ui/shared/models/deserializable.model';

export class BlogPostStatus implements Deserializable {
    constructor(partial: Partial<BlogPostStatus>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        return this;
    }

    id?: number;

    status: string;
}