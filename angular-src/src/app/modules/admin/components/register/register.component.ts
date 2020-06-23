import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Admin } from '@app/shared/interfaces';
import { ApiService } from '@app/core/http';
import { NotificationService, ValidationService } from '@app/core/services';

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
        private notificationService: NotificationService,
        public validationService: ValidationService
    ) { }

    ngOnInit(): void { }

    onRegisterSubmit(): void {
        const admin: Admin = {
            username: this.username,
            password: this.password
        };

        this.apiService.registerAdmin(admin).subscribe(res => {
            let message: string;
            let navURL: string;

            if(res.success) {
                message = `Hello, ${admin.username}!`;
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
