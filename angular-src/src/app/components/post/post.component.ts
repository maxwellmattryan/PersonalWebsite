import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from 'src/app/models';

import { BlogService } from 'src/app/services';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    isLoaded: boolean = false;
    post: Post;

    constructor(
        private blogService: BlogService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.blogService.getPost(this.router.url).subscribe(post => {
            this.post = post;
            this.isLoaded = true;
        });
    }
}
