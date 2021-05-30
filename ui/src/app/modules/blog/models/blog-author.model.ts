import { Id } from '@ui/core/models/model';
import { Deserializable } from '@ui/core/models/deserializable.model';

export class BlogAuthor implements Deserializable {
    constructor(partial: Partial<BlogAuthor>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    id?: Id;

    first_name: string;
    last_name: string;
}
