import { Deserializable } from '@app/shared/models/deserializable.model';

export class ProjectLink implements Deserializable {
    constructor(partial: Partial<ProjectLink>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    id: number;

    name: string;

    url: string;
}