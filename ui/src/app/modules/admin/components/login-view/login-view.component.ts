import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService, AuthService } from '@ui/core/auth';
import { NotificationService, ValidationService } from '@ui/core/services';

import { Admin } from '../../interfaces';

@Component({
    selector: 'ui-login-view',
    templateUrl: './login-view.component.html',
    styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
    username: string = '';
    password: string = '';

    public isLoggingIn: boolean = false;

    constructor(
        private router: Router,
        private authApiService: AuthApiService,
        private authService: AuthService,
        private notificationService: NotificationService,
        public validationService: ValidationService
    ) { }

    ngOnInit(): void {
        if(this.authService.isLoggedIn()) {
            this.notificationService.createNotification('Already logged in.');
            this.router.navigate(['admin']);
        }
    }

    onLoginSubmit(): void {
        this.isLoggingIn = true;

        const admin: Admin = {
            username: this.username,
            password: this.password
        };

        this.authApiService.loginAdmin(admin).subscribe(res => {
            this.authService.loginAdmin(res.id, res.username);
            this.isLoggingIn = false;
            this.notificationService.createNotification(`Welcome back, ${res.username}!`);
            this.router.navigate(['admin']);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
            this.isLoggingIn = false;
        });
    }
}
