import { Component, OnInit } from '@angular/core';

import { Post } from '@app/shared/models';
import { ApiService } from '@app/core/http';

@Component({
    selector: 'app-blog-display',
    templateUrl: './blog-display.component.html',
    styleUrls: ['./blog-display.component.scss']
})
export class BlogDisplayComponent implements OnInit {
    posts: Array<Post>;

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.apiService.getPosts().subscribe(posts => {
            this.posts = posts;
        });
    }
}