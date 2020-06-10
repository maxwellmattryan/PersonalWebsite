import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, ValidationService } from 'services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;

    constructor(
        private router: Router,
        private authService: AuthService,
        public validationService: ValidationService
    ) { }

    ngOnInit(): void {
    }

    onLoginSubmit(): void {
        const admin = {
            username: this.username,
            password: this.password
        };

        this.authService.authenticateAdmin(admin).subscribe(res => {
            if(res.success) {
                console.log('TODO: material snackbar');
                this.authService.storeAdminData(res.token, res.admin);
                this.router.navigate(['admin']);
            } else {
                console.log('TODO: material snackbar');
                this.router.navigate(['admin/login'])
            }
        });
    }
}
