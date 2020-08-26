import { Injectable } from '@angular/core';

import { Profile } from '@app/shared/models';
import { ProfileStatus } from '@app/shared/models/profile-status.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    profiles: Array<Profile>;

    constructor() { }

    activateProfile(profile: Profile): Profile {
        profile.status = new ProfileStatus({ id: 1, status: 'ACTIVE' });

        this.profiles.map(p => {
            p.status = p.id === profile.id ?
              new ProfileStatus({ id: 1, status: 'ACTIVE' }) : new ProfileStatus({ id: 2, status: 'INACTIVE' });

            return p;
        });

        return profile;
    }

    getProfiles(): Array<Profile> {
        return this.profiles;
    }

    setProfiles(profiles: Array<Profile>): void {
        this.profiles = profiles;
    }
}
