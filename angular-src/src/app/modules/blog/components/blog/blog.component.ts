import { Component, OnInit } from '@angular/core';

import { NotificationService } from 'services';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

    constructor(
        private notificationService: NotificationService,
    ) { }

    ngOnInit(): void {
        this.notificationService.createNotification('yo.');
    }
}
