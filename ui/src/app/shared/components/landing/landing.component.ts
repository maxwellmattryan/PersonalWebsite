import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {
    @Input() tagline: string;
    @Input() landing: string;

    constructor() { }

    ngOnInit(): void { }

    constructEmail(name: string, domain: string): string {
        return `${name}@${domain}.com`;
    }
}