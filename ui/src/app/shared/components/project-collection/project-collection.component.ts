import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '@app/core/authentication';
import { Project } from '@app/shared/models';

@Component({
    selector: 'app-project-collection',
    templateUrl: './project-collection.component.html',
    styleUrls: ['./project-collection.component.scss']
})
export class ProjectCollectionComponent implements OnInit {
    @Input() projects: Project[];

    constructor(
        public authService: AuthService
    ) { }

    ngOnInit(): void { }
}
