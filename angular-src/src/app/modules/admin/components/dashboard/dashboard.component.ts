import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, NotificationService } from 'services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(
        private router: Router,
        public authService: AuthService,
        private notificationService: NotificationService,
    ) { }

    ngOnInit(): void { }

    onLogoutClick(): void {
        const message = `Bye, ${this.authService.getAdmin()}!`;
        this.notificationService.createNotification(message);

        this.authService.logoutAdmin();
        
        this.router.navigate(['admin'])
    }
}
