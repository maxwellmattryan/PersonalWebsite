import { Injectable } from '@nestjs/common';

import { Profile } from './profile.model';

@Injectable()
export class ProfileService {
    private profiles: Profile[];

    getProfiles(): string {
        return 'Fetching all the profiles!';
    }

    getActiveProfile(): Profile {
        return this.profiles[0];
    }
}