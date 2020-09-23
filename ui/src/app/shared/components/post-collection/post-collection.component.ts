import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { BlogPost } from '@app/shared/models';
import { BlogService, ComparisonService, SeoService, TrackingService } from '@app/core/services';

@Component({
    selector: 'app-post-collection',
    templateUrl: './post-collection.component.html',
    styleUrls: ['./post-collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCollectionComponent implements OnInit {
    @Input() posts: BlogPost[];
    
    @Input() showPreview: boolean;
    @Input() showTopics: boolean;
    @Input() showReadmore: boolean;

    // CAUTION: This is necessary because the routing changes when this component is used outside of the blog module
    @Input() baseRoute: string = 'blog/posts';

    nPostsToDisplay: number = 5;

    constructor(
        public blogService: BlogService,
        private comparisonService: ComparisonService,
        public seoService: SeoService,
        public trackingService: TrackingService
    ) { }

    ngOnInit(): void {
        this.posts.forEach(p => {
            p.topics.sort(this.comparisonService.topics);
        });
    }

    getPosts(): BlogPost[] {
        return this.posts.slice(0, this.nPostsToDisplay);
    }

    displayMorePosts(): void {
       this.nPostsToDisplay += 5;

        if(this.nPostsToDisplay >= this.posts.length) {
            this.nPostsToDisplay = this.posts.length;
        }
    }

    getPostUrl(id: number, name: string): string {
        return `${this.baseRoute}/${this.seoService.getCanonicalUrl(id, name)}`;
    }
}