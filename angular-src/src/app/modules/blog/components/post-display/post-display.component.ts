import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '@app/shared/models';
import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/authentication';
import { EditorService, NotificationService } from '@app/core/services';

@Component({
    selector: 'app-post-display',
    templateUrl: './post-display.component.html',
    styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent implements OnInit {
    isAdmin: boolean = false;
    isLoaded: boolean = false;

    post: Post;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
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

    getFormattedDate(): string {
        const date = new Date(this.post.created);

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const nth = (day) => {
            if(day > 3 && day < 21) return 'th'; 

            switch(day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return months[date.getMonth()] + ' ' + date.getDate() + '<sup>' + nth(date.getDate()) + '</sup>, ' + date.getFullYear();
    }
}