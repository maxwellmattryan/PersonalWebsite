import { Deserializable } from './deserializable.model';

export class BlogTopic implements Deserializable {
    constructor(partial: Partial<BlogTopic>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        return this;
    }

    id?: number;

    name: string;
    description: string;

    created_at: Date;
    updated_at: Date;
}