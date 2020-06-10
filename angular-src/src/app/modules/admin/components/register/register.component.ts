import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, NotificationService, ValidationService } from 'services';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    username: string;
    password: string;

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService,
        public validationService: ValidationService
    ) { }

    ngOnInit(): void { }

    onRegisterSubmit(): void {
        const admin = {
            username: this.username,
            password: this.password
        };

        this.authService.registerAdmin(admin).subscribe(res => {
            let message: string;
            let navURL: string;

            if(res.success) {
                message = `Hello, ${this.username}!`;
                navURL = 'admin/login';
            } else {
                message = res.msg;
                navURL = 'admin/register';                
            }

            this.notificationService.createNotification(message);
            this.router.navigate([navURL]);
        });
    }
}
