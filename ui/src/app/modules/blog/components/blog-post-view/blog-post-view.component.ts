import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '@ui/core/auth';
import {
    NotificationService,
    SeoService,
    TrackingService
} from '@ui/core/services';

import { BlogPost } from '../../models';
import { BlogApiService, BlogEditorService, BlogComparisonService, BlogTopicService } from '../../services';

@Component({
    selector: 'ui-blog-post-view',
    templateUrl: './blog-post-view.component.html',
    styleUrls: ['./blog-post-view.component.scss']
})
export class BlogPostViewComponent implements OnInit {
    isAdmin: boolean = false;
    isLoaded: boolean = false;

    post: BlogPost;

    constructor(
        private authService: AuthService,
        private blogApiService: BlogApiService,
        private blogEditorService: BlogEditorService,
        private blogComparisonService: BlogComparisonService,
        public blogTopicService: BlogTopicService,
        private notificationService: NotificationService,
        public seoService: SeoService,
        private titleService: Title,
        public trackingService: TrackingService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();

        const postId = this.seoService.getIdFromUrl(this.router.url);
        if(!postId) {
            this.notificationService.createNotification('Unable to find post ID.');
            this.router.navigate(['']);
            return;
        }

        this.blogApiService.getPost(postId).subscribe((res: BlogPost) => {
            if(res.status.status !== 'PUBLISHED' && !this.isAdmin) {
                this.notificationService.createNotification('Unable to view the blog post.');
                this.router.navigate(['']);
            }

            this.titleService.setTitle(`${res.title} | Blog | Matthew Maxwell`);

            this.post = res;
            this.post.topics.sort(this.blogComparisonService.topics);

            this.isLoaded = true;
        });
    }

    sendPostToEditor(): void {
        this.blogEditorService.setPost(this.post);
    }

    deletePost(id: number): void {
        this.blogApiService.deletePost(id).subscribe((res: any) => {
            this.notificationService.createNotification('Successfully deleted blog post!');
            this.router.navigate(['/blog']);
        });
    }
}
