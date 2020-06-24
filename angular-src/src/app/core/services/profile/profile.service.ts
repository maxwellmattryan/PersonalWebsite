import { Injectable } from '@angular/core';

import { Profile } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    profiles: Array<Profile>;

    constructor() { }

    activateProfile(profile: Profile): Profile {
        profile.active = true;
        
        this.profiles.map(p => {
            p.active = p._id === profile._id;
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