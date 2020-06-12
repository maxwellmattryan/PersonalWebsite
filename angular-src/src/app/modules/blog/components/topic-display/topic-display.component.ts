import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Topic } from '@app/shared/models';
import { ApiService } from '@app/core/http';

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
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.apiService.getTopic(this.router.url).subscribe(topic => {
            this.isLoaded = true;
            this.topic = topic;
        });
    }
}