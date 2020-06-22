import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '@app/shared/models';
import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/authentication';
import { BlogService, EditorService, NotificationService } from '@app/core/services';

@Component({
    selector: 'app-post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
    isAdmin: boolean = false;
    isLoaded: boolean = false;

    post: Post;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        public blogService: BlogService,
        private editorService: EditorService,
        private notificationService: NotificationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();

        this.apiService.getPost(this.router.url).subscribe(post => {
            this.isLoaded = true;
            this.post = post;
        });
    }

    sendPostToEditor(): void {
        this.editorService.setPost(this.post);
    }

    deletePost(): void {
        this.apiService.deletePost(this.router.url, this.authService.getAuthHeaders()).subscribe(result => {
            let message = 'Successfully deleted blog post!';
            this.notificationService.createNotification(message);
            
            this.router.navigate(['/blog']);
        });
    }

    activateTopic(topic: string): void {
        this.blogService.setActiveTopic(topic);
    }
}