import { Component, OnInit } from '@angular/core';

import { Homepage } from '@app/shared/interfaces';
import { ApiService } from '@app/core/http';
import { NotificationService } from '@app/core/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
    isLoaded: boolean = false;

    homepage: Homepage;

    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.apiService.getHomepage().subscribe(res => {
            console.log(res);

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }
}
