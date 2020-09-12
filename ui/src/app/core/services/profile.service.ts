import { Injectable } from '@angular/core';

import { Profile } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private activeProfile: Profile;

    constructor() { }

    public getActiveProfile(): Profile {
        return this.activeProfile;
    }

    public getActiveProfileName(): string {
        return this.activeProfile ? this.activeProfile.name : 'Software Engineering';
    }

    public setActiveProfile(profile: Profile): void {
        this.activeProfile = profile;
    }
}
