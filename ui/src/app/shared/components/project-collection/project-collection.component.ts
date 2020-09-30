import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from '@app/core/auth';
import { SeoService, TrackingService } from '@app/core/services';
import { PortfolioProject } from '@app/modules/portfolio/models';

@Component({
    selector: 'app-project-collection',
    templateUrl: './project-collection.component.html',
    styleUrls: ['./project-collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCollectionComponent implements OnInit {
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
