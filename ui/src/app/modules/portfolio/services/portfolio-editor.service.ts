import { Injectable } from '@angular/core';

import { EditorService } from '@ui/core/services';

import { PortfolioProfile, PortfolioProject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioEditorService extends EditorService {
    private profile: PortfolioProfile;
    private project: PortfolioProject;

    constructor() {
        super();
    }

    getProfile(): PortfolioProfile {
        console.log(this.profile);
        return this.profile;
    }

    hasProfile(): boolean {
        return this.profile !== undefined;
    }

    setProfile(profile: PortfolioProfile): void {
        this.profile = profile;
        console.log(this.profile);
    }

    getProject(): PortfolioProject {
        return this.project;
    }

    hasProject(): boolean {
        return this.project !== undefined;
    }

    setProject(project: PortfolioProject): void {
        this.project = project;
    }
}