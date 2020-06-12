import { Component, OnInit, Input } from '@angular/core';

import { Post } from '@app/shared/models';

@Component({
    selector: 'app-post-collection',
    templateUrl: './post-collection.component.html',
    styleUrls: ['./post-collection.component.scss']
})
export class PostCollectionComponent implements OnInit {
    @Input() posts: Array<Post>;

    constructor() { }

    ngOnInit(): void { }
}