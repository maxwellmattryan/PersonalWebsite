import { Component, Input, OnInit } from '@angular/core';

import { Post } from '@app/shared/models';
import { BlogService } from '@app/core/services';

@Component({
    selector: 'app-post-collection',
    templateUrl: './post-collection.component.html',
    styleUrls: ['./post-collection.component.scss']
})
export class PostCollectionComponent implements OnInit {
    @Input() content: Array<Post>;

    constructor(
        public blogService: BlogService
    ) { }

    ngOnInit(): void { }

    activateTopic(topic: string): void {
        this.blogService.setActiveTopic(topic);
    }
}