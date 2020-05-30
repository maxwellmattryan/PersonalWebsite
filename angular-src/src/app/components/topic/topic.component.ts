import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Topic } from '../../models';

import { BlogService } from 'src/app/services';

@Component({
    selector: 'app-topic',
    templateUrl: './topic.component.html',
    styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
    isLoaded: boolean = false;
    topic: Topic;

    constructor(
        private blogService: BlogService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.blogService.getTopic(this.router.url).subscribe(topic => {
            this.topic = topic;
            this.isLoaded = true;
        });
    }

}
