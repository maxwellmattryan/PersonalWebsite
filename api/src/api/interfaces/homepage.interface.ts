import { Profile } from '@api/profile/entities/profile.entity';

export class Homepage {
    profile: Profile;
    projects: string = 'projects';
    posts: string = 'posts';
}