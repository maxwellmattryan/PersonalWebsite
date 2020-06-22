import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-project-collection',
    templateUrl: './project-collection.component.html',
    styleUrls: ['./project-collection.component.scss']
})
export class ProjectCollectionComponent implements OnInit {
    @Input() content: any;

    constructor() { }

    ngOnInit(): void { }
}