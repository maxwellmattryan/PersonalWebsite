import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlogPost } from '@app/shared/models';
import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/authentication';
import { BlogService, EditorService, NotificationService, ComparisonService, SeoService } from '@app/core/services';
import { HttpErrorResponse } from '@angular/common/http';

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
        private seoService: SeoService,
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

        this.apiService.getPost(postId).subscribe(post => {
            if(post.status.status !== 'PUBLISHED' && !this.isAdmin) {
                this.notificationService.createNotification('Unable to view the blog post.');
                this.router.navigate(['']);
            }

            this.post = post;
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
