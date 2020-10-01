import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { PortfolioProfileTechnology } from '@ui/modules/portfolio/models';
import { TrackingService } from '@ui/core/services';

@Component({
    selector: 'app-home-about',
    templateUrl: './home-about.component.html',
    styleUrls: ['./home-about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeAboutComponent implements OnInit {
    @Input() paragraph: string;
    @Input() technologies: PortfolioProfileTechnology[];
    @Input() imageUrl: string;

    constructor(
        public trackingService: TrackingService
    ) { }

    ngOnInit(): void { }
}