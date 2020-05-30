import { Deserializable } from './deserializable.model';

export class Topic implements Deserializable {
    _id: any;
    name: string;
    description: string;
    imageUrl: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}