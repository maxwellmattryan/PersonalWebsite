import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '@app/core/authentication';

@Component({
    selector: 'app-project-collection',
    templateUrl: './project-collection.component.html',
    styleUrls: ['./project-collection.component.scss']
})
export class ProjectCollectionComponent implements OnInit {
    @Input() content: any;

    constructor(
        public authService: AuthService
    ) { }

    ngOnInit(): void { }
}