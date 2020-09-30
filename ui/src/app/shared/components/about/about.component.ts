import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { PortfolioProfileTechnology } from '@app/modules/portfolio/models';
import { TrackingService } from '@app/core/services';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
    @Input() paragraph: string;
    @Input() technologies: PortfolioProfileTechnology[];
    @Input() imageUrl: string;

    constructor(
        public trackingService: TrackingService
    ) { }

    ngOnInit(): void { }
}