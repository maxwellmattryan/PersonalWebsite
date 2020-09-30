import { Injectable } from '@angular/core';

import { PortfolioProfile } from '@ui/modules/portfolio/models';

@Injectable({
    providedIn: 'root'
})
export class PortfolioProfileService {
    private activeProfile: PortfolioProfile;

    constructor() { }

    public getActiveProfile(): PortfolioProfile {
        return this.activeProfile;
    }

    public getActiveProfileName(): string {
        return this.activeProfile ? this.activeProfile.name : 'Software Engineering';
    }

    public setActiveProfile(profile: PortfolioProfile): void {
        this.activeProfile = profile;
    }
}
