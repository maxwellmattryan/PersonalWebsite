import { Id } from '@ui/core/models/model';
import { Deserializable } from '@ui/core/models/deserializable.model';

import { PortfolioProfileStatus } from './portfolio-profile-status.model';
import { PortfolioProfileTechnology } from './portfolio-profile-technology.model';
import { PortfolioProject } from './portfolio-project.model';

export class PortfolioProfile implements Deserializable {
    constructor(partial: Partial<PortfolioProfile>) {
        Object.assign(this, partial);
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        this.status = input.status.map(s => new PortfolioProfileStatus({ ...s }).deserialize(s));
        this.technologies = input.technologies.map(t => new PortfolioProfileTechnology({ ...t }).deserialize(t));
        this.projects = input.projects.map(p => new PortfolioProject({ ...p }).deserialize(p));

        return this;
    }

    id?:             Id;

    status:         PortfolioProfileStatus;
    technologies:   PortfolioProfileTechnology[];
    projects:       PortfolioProject[];

    name:           string;
    tagline:        string;
    landing:        string;
    about:          string;
    image_url:      string;

    created_at:      Date;
    updated_at:      Date;
}
