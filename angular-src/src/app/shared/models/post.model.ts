import { Deserializable } from './deserializable.model';
import { Topic } from './topic.model';

export class Post implements Deserializable {
    _id:            any;
    uri:            string;
    title:          string;
    subtitle:       string;
    topics:         Array<Topic>;
    author:         string;
    description:    string;
    content:        string;
    imageURL:       string;
    created:        string;

    deserialize(input: any): this {
        Object.assign(this, input);

        this.topics = input.topics.map(t => new Topic().deserialize(t));

        return this;
    }
}