import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SeoService, TrackingService } from '@ui/core/services';

import { BlogPost } from '../../models';
import { BlogComparisonService, BlogTopicService } from '../../services';

@Component({
    selector: 'app-blog-post-collection',
    templateUrl: './blog-post-collection.component.html',
    styleUrls: ['./blog-post-collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostCollectionComponent implements OnInit {
    @Input() posts: BlogPost[];
    
    @Input() showPreview: boolean;
    @Input() showTopics: boolean;
    @Input() showReadmore: boolean;

    // CAUTION: This is necessary because the routing changes when this component is used outside of the blog module
    @Input() baseRoute: string = 'blog/posts';

    nPostsToDisplay: number = 5;

    constructor(
        private blogComparisonService: BlogComparisonService,
        public blogTopicService: BlogTopicService,
        public seoService: SeoService,
        public trackingService: TrackingService
    ) { }

    ngOnInit(): void {
        this.posts.forEach(p => {
            p.topics.sort(this.blogComparisonService.topics);
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