import { Component, OnInit } from '@angular/core';

import { Post } from '@app/shared/models';
import { ApiService } from '@app/core/http';

@Component({
    selector: 'app-blog-view',
    templateUrl: './blog-view.component.html',
    styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {
    posts: Array<Post>;

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.apiService.getBlog().subscribe((blog: any) => {
            this.posts = blog.posts;
        });
    }
}