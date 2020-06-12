import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Topic } from '@app/shared/models';
import { BlogService } from '@app/core/services';

@Component({
    selector: 'app-topic-display',
    templateUrl: './topic-display.component.html',
    styleUrls: ['./topic-display.component.scss']
})
export class TopicDisplayComponent implements OnInit {
    isLoaded: boolean = false;

    topic: Topic;

    constructor(
        private router: Router,
        private blogService: BlogService
    ) { }

    ngOnInit(): void {
        this.blogService.getTopic(this.router.url).subscribe(topic => {
            this.isLoaded = true;
            this.topic = topic;
        });
    }
}