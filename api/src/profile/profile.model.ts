import { ProfileStatus } from './profile-status.model';

export class Profile {
    id: number;

    status: ProfileStatus;

    name: string;
    tagline: string;
    landing: string;
    about: string;

    createdAt: Date;
    updatedAt: Date;
}