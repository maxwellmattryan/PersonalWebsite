import { Component, OnInit, Input } from '@angular/core';

import { External } from '@app/shared/interfaces/external.interface';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
    @Input() external: External;

    constructor() { }

    ngOnInit(): void { }
}