import { Injectable } from '@angular/core';

import { EditorService } from '@ui/core/services';

import { PortfolioProfile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioProfileEditorService extends EditorService {
    private profile: PortfolioProfile;

    constructor() {
        super();
    }

    getProfile(): PortfolioProfile {
        return this.profile;
    }

    hasProfile(): boolean {
        return this.profile !== undefined;
    }

    setProfile(profile: PortfolioProfile): void {
        this.profile = profile;
    }
}
