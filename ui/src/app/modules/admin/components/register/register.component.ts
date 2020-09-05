import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Admin } from '@app/shared/interfaces';
import { ApiService } from '@app/core/http';
import { NotificationService, ValidationService } from '@app/core/services';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@app/core/authentication';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    username: string = '';
    password: string = '';

    constructor(
        private router: Router,
        private apiService: ApiService,
        private authService: AuthService,
        private notificationService: NotificationService,
        public validationService: ValidationService
    ) { }

    ngOnInit(): void {
        this.notificationService.createNotification('This functionality is not available.');
        this.router.navigate(['admin']);

        if(this.authService.isLoggedIn()) {
            this.notificationService.createNotification('Already logged in.');
            this.router.navigate(['admin']);
        }
    }

    onRegisterSubmit(): void {
        const admin: Admin = {
            username: this.username,
            password: this.password
        };

        this.apiService.registerAdmin(admin).subscribe(res => {
            this.notificationService.createNotification(`Hello, ${admin.username}! Please log in.`);
            this.router.navigate(['admin/login']);
        }, (error: HttpErrorResponse) => {
          this.notificationService.createNotification(error.error.message);
        });
    }
}
