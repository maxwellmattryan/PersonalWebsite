import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
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