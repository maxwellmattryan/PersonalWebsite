import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { TrackingService } from '@ui/core/services';

import { FileApiService } from '@ui/modules/file/services';

import { PortfolioProfileTechnology } from '@ui/modules/portfolio/models';

@Component({
    selector: 'ui-home-about',
    templateUrl: './home-about.component.html',
    styleUrls: ['./home-about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeAboutComponent implements OnInit {
    @Input() paragraph: string;
    @Input() technologies: PortfolioProfileTechnology[];
    @Input() imageUrl: string;

    constructor(
        public readonly fileService: FileApiService,
        public readonly trackingService: TrackingService
    ) { }

    ngOnInit(): void { }
}
