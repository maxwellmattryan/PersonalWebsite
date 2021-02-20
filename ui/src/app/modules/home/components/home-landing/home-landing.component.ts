import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { ObfuscationService } from '@ui/core/services/obfuscation.service';

@Component({
    selector: 'ui-home-landing',
    templateUrl: './home-landing.component.html',
    styleUrls: ['./home-landing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLandingComponent implements OnInit {
    @Input() tagline: string;
    @Input() landing: string;

    constructor(
        public readonly obfuscationService: ObfuscationService
    ) { }

    ngOnInit(): void { }
}