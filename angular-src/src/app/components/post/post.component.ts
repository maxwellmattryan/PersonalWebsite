import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();

        this.blogService.getPost(this.router.url).subscribe(post => {
            this.post = post;
            this.isLoaded = true;
        });
    }

    sendPostToEditor(): void {
        this.editorService.setPostData(this.post);
    }

    deletePost(): void {
        this.blogService.deletePost(this.router.url, this.authService.getAuthHeaders()).subscribe(result => {
            this.router.navigate(['/blog']);
        });
    }
}
