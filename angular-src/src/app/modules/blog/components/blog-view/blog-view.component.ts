import { Component, OnInit } from '@angular/core';

import { ApiService } from '@app/core/http/api.service';
import { Blog } from '@app/shared/interfaces';

@Component({
    selector: 'app-blog-view',
    templateUrl: './blog-view.component.html',
    styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {
    isLoaded: boolean = false;

    blog: Blog;
    
    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.apiService.getBlog().subscribe((blog: Blog) => {
            this.isLoaded = true;
            this.blog = blog;
        });
    }
}