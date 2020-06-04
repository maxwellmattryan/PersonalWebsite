import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { Post } from 'src/app/models';

import { AuthService, BlogService, EditorService } from 'src/app/services';

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
        private editorService: EditorService,
        private flashMessagesService: FlashMessagesService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();

        this.blogService.getPost(this.router.url).subscribe(post => {
            this.isLoaded = true;
            
            this.post = post;
            this.post.created = this.getFormattedDate(new Date(this.post.created));
        });
    }

    sendPostToEditor(): void {
        this.editorService.setPostData(this.post);
    }

    deletePost(): void {
        this.blogService.deletePost(this.router.url, this.authService.getAuthHeaders()).subscribe(result => {
            this.flashMessagesService.show('Successfully deleted blog post.', {
                cssClass: 'alert-success',
                timeout: 2000
            });
            this.router.navigate(['/blog']);
        });
    }

    getFormattedDate(date: Date): string {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    }
}
