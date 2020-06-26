import { Component, Input, OnInit } from '@angular/core';

import { Post } from '@app/shared/models';
import { BlogService, ComparisonService } from '@app/core/services';

@Component({
    selector: 'app-post-collection',
    templateUrl: './post-collection.component.html',
    styleUrls: ['./post-collection.component.scss']
})
export class PostCollectionComponent implements OnInit {
    @Input() content: Array<Post>;
    
    @Input() showPreview: boolean;
    @Input() showTopics: boolean;

    nPostsToDisplay: number = 5;

    constructor(
        public blogService: BlogService,
        private comparisonService: ComparisonService
    ) { }

    ngOnInit(): void { }

    getPosts(): Array<Post> {
        return this.content.sort(this.comparisonService.posts).slice(0, this.nPostsToDisplay);
    }

    activateTopic(topic: string): void {
        this.blogService.setActiveTopic(topic);
    }

    displayMorePosts(): void {
       this.nPostsToDisplay += 5;

        if(this.nPostsToDisplay >= this.content.length) {
            this.nPostsToDisplay = this.content.length;
        }
    }
}