import { Injectable } from '@angular/core';

import { ComparisonService } from '@ui/core/services';

import { PortfolioProject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioProjectComparisonService extends ComparisonService {
    constructor() {
        super();
    }

    projects = (p1: PortfolioProject, p2: PortfolioProject) => {
        if(p1.name > p2.name) return 1;
        if(p1.name < p2.name) return -1;

        return 0;
    };
}
