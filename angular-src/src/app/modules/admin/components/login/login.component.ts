import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Admin } from '@app/shared/interfaces';
import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/authentication';
import { NotificationService, ValidationService } from '@app/core/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';

    constructor(
        private router: Router,
        private apiService: ApiService,
        private authService: AuthService,
        private notificationService: NotificationService,
        public validationService: ValidationService
    ) { }

    ngOnInit(): void { }

    onLoginSubmit(): void {
        let admin: Admin = {
            username: this.username,
            password: this.password
        };

        this.apiService.authenticateAdmin(admin).subscribe(res => {
            let message: string;
            let navURL: string;
            
            if(res.success) {
                message = `Welcome back, ${admin.username}!`;
                navURL = 'admin';
                
                this.authService.storeAdminData(res.token, res.admin);
            } else {
                message = res.msg;
                navURL = 'admin/login';
            }
            
            this.notificationService.createNotification(message);
            this.router.navigate([navURL]);
        });
    }
}
