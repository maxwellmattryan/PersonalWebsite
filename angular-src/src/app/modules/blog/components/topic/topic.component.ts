import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Topic } from 'models';
import { BlogService } from 'services';

@Component({
    selector: 'app-topic',
    templateUrl: './topic.component.html',
    styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
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