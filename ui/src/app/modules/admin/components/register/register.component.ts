import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService, AuthService } from '@ui/core/auth';
import { NotificationService, ValidationService } from '@ui/core/services';

import { Admin } from '../../interfaces';

@Component({
    selector: 'ui-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    username: string = '';
    password: string = '';

    public isRegistering: boolean = false;

    constructor(
        private router: Router,
        private authApiService: AuthApiService,
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
        this.isRegistering = true;

        const admin: Admin = {
            username: this.username,
            password: this.password
        };

        this.authApiService.registerAdmin(admin).subscribe(res => {
            this.notificationService.createNotification(`Hello, ${admin.username}! Please log in.`);
            this.isRegistering = false;
            this.router.navigate(['admin/login']);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
            this.isRegistering = false;
        });
    }
}
