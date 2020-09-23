import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { BlogPost } from '@app/shared/models';
import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/auth';
import {
    BlogService,
    ComparisonService,
    EditorService,
    NotificationService,
    SeoService,
    ProfileService,
    TrackingService
} from '@app/core/services';

@Component({
    selector: 'app-post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
    isAdmin: boolean = false;
    isLoaded: boolean = false;

    post: BlogPost;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        public blogService: BlogService,
        private comparisonService: ComparisonService,
        private editorService: EditorService,
        private notificationService: NotificationService,
        private profileService: ProfileService,
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

        this.apiService.getPost(postId).subscribe((res: BlogPost) => {
            if(res.status.status !== 'PUBLISHED' && !this.isAdmin) {
                this.notificationService.createNotification('Unable to view the blog post.');
                this.router.navigate(['']);
            }

            this.titleService.setTitle(`${res.title} | Blog | Matthew Maxwell`);

            this.post = res;
            this.post.topics.sort(this.comparisonService.topics);

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    sendPostToEditor(): void {
        this.editorService.setPost(this.post);
    }

    deletePost(id: number): void {
        this.apiService.deletePost(id).subscribe((res: any) => {
            this.notificationService.createNotification('Successfully deleted blog post!');
            this.router.navigate(['/blog']);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }
}
