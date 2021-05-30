import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from '@ui/core/auth';
import { SeoService, TrackingService } from '@ui/core/services';

import { FileService } from '@ui/modules/file/services';
import { PortfolioComparisonService } from '@ui/modules/portfolio/services';

import { PortfolioProject } from '../../models';

@Component({
    selector: 'ui-portfolio-project-collection',
    templateUrl: './portfolio-project-collection.component.html',
    styleUrls: ['./portfolio-project-collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioProjectCollectionComponent implements OnInit {
    @Input() projects: PortfolioProject[];

    constructor(
        public readonly authService: AuthService,
        public readonly fileService: FileService,
        private readonly portfolioComparisonService: PortfolioComparisonService,
        private readonly seoService: SeoService,
        public readonly trackingService: TrackingService
    ) { }

    ngOnInit(): void {
        this.projects = this.projects.sort(this.portfolioComparisonService.projects);
    }

    getProjectUrl(id: number, name: string): string {
        return `portfolio/projects/${this.seoService.getCanonicalUrl(id, name)}`;
    }
}
