import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from '@ui/core/services';
import { ShopApiService } from '@ui/modules/store/services';

@Component({
    selector: 'ui-store-view',
    templateUrl: './store-view.component.html',
    styleUrls: ['./store-view.component.scss']
})
export class StoreViewComponent implements OnInit {
    public isLoaded: boolean = false;

    public store: string = 'Yo. ';

    constructor(
        private router: Router,
        private notificationService: NotificationService,
        private shopApiService: ShopApiService
    ) { }

    ngOnInit(): void {
        this.shopApiService.getStore().subscribe((res: string) => {
            this.store += res;

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
            this.router.navigate(['']);
        });
    }
}
