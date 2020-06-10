import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from 'models';
import { AuthService, BlogService, NotificationService } from 'services';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    isAdmin: boolean = false;
    isLoaded: boolean = false;

    post: Post;

    constructor(
        private authService: AuthService,
        private blogService: BlogService,
        private notificationService: NotificationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();

        this.blogService.getPost(this.router.url).subscribe(post => {
            this.isLoaded = true;
            this.post = post;
        });
    }

    sendPostToEditor(): void {
        this.blogService.setPostData(this.post);
    }

    deletePost(): void {
        this.blogService.deletePost(this.router.url, this.authService.getAuthHeaders()).subscribe(result => {
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