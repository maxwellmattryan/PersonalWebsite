import { Component, OnInit, Input } from '@angular/core';

import { ProfileTechnology } from '@app/shared/models';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    @Input() paragraph: string;
    @Input() technologies: ProfileTechnology[];
    @Input() imageUrl: string;

    constructor() { }

    ngOnInit(): void { }
}