import { Id } from '@ui/core/models/model';
import { Deserializable } from '@ui/core/models/deserializable.model';

export class BlogTopic implements Deserializable {
    constructor(partial: Partial<BlogTopic>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        return this;
    }

    id?: Id;

    name: string;
    description: string;

    created_at: Date;
    updated_at: Date;
}
