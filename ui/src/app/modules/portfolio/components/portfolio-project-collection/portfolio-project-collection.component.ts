import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from '@ui/core/auth';
import { SeoService, TrackingService } from '@ui/core/services';
import { PortfolioProject } from '@ui/modules/portfolio/models';

@Component({
    selector: 'app-portfolio-project-collection',
    templateUrl: './portfolio-project-collection.component.html',
    styleUrls: ['./portfolio-project-collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioProjectCollectionComponent implements OnInit {
    @Input() projects: PortfolioProject[];

    constructor(
        public authService: AuthService,
        private seoService: SeoService,
        public trackingService: TrackingService
    ) { }

    ngOnInit(): void { }

    getProjectUrl(id: number, name: string): string {
        return `portfolio/projects/${this.seoService.getCanonicalUrl(id, name)}`;
    }
}
