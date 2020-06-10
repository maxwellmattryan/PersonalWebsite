import { Component, OnInit } from '@angular/core';

import { NotificationService } from 'services'; 

@Component({
    selector: 'app-blog-container',
    templateUrl: './blog-container.component.html',
    styleUrls: ['./blog-container.component.scss']
})
export class BlogContainerComponent implements OnInit {

    constructor(
        private notificationService: NotificationService,
    ) { }

    ngOnInit(): void {
        this.notificationService.createNotification('yo.');
    }
}
