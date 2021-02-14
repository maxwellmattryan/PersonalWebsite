import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ui-home-landing',
    templateUrl: './home-landing.component.html',
    styleUrls: ['./home-landing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLandingComponent implements OnInit {
    @Input() tagline: string;
    @Input() landing: string;

    constructor() { }

    ngOnInit(): void { }

    constructEmail(name: string, domain: string): string {
        return `${name}@${domain}.com`;
    }
}