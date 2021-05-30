import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from '@ui/core/auth';
import { NotificationService } from '@ui/core/services';
import { PortfolioComparisonService, PortfolioProfileService } from '@ui/modules/portfolio/services';

import { Homepage } from './interfaces';
import { HomeApiService } from './services';

@Component({
    selector: 'ui-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    homepage: Homepage;

    isLoaded: boolean = false;

    constructor(
        private authService: AuthService,
        private homeApiService: HomeApiService,
        private notificationService: NotificationService,
        private portfolioComparisonService: PortfolioComparisonService,
        private portfolioProfileService: PortfolioProfileService,
        private titleService: Title
    ) { }

    ngOnInit(): void {
        this.homeApiService.getHomepage().subscribe((res: Homepage) => {
            this.homepage = res;
            this.homepage.profile.technologies = res.profile.technologies.sort(this.portfolioComparisonService.profileTechnologies);

            this.portfolioProfileService.setActiveProfile(this.homepage.profile);
            this.titleService.setTitle(`${this.homepage.profile.name} Blog, Portfolio, and Shop | Matthew Maxwell`);

            this.isLoaded = true;
        });
    }
}
