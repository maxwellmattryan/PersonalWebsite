import { Component, OnInit, Input } from '@angular/core';

import { Post } from '@app/shared/models';

@Component({
    selector: 'app-post-container',
    templateUrl: './post-container.component.html',
    styleUrls: ['./post-container.component.scss']
})
export class PostContainerComponent implements OnInit {
    @Input() posts: Array<Post>;

    constructor() { }

    ngOnInit(): void { }
}