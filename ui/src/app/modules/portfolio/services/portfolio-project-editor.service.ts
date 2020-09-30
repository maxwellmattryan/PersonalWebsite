import { Injectable } from '@angular/core';

import { EditorService } from '@ui/core/services';

import { PortfolioProject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioProjectEditorService extends EditorService {
    private project: PortfolioProject;

    constructor() {
        super();
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