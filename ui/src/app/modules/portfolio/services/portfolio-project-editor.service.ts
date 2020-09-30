import { Injectable } from '@angular/core';

import { PortfolioProject } from '@ui/modules/portfolio/models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioProjectEditorService {
    private project: PortfolioProject;

    constructor() { }

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