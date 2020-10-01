import { Injectable } from '@angular/core';

import { ComparisonService } from '@ui/core/services';

import { PortfolioProfile, PortfolioProfileTechnology, PortfolioProject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioComparisonService extends ComparisonService {
    constructor() {
        super();
    }

    profiles = (p1: PortfolioProfile, p2: PortfolioProfile) => {
        if(p1.name > p2.name) return 1;
        if(p1.name < p2.name) return -1;

        return 0;
    };

    profileTechnologies = (pt1: PortfolioProfileTechnology, pt2: PortfolioProfileTechnology) => {
        if(pt1.display_order > pt2.display_order) return 1;
        if(pt1.display_order < pt2.display_order) return -1;

        return 0;
    };

    projects = (p1: PortfolioProject, p2: PortfolioProject) => {
        if(p1.name > p2.name) return 1;
        if(p1.name < p2.name) return -1;

        return 0;
    };
}