import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, ValidationService } from 'services';

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
        public validationService: ValidationService
    ) { }

    ngOnInit(): void {
    }

    onRegisterSubmit(): void {
        const admin = {
            username: this.username,
            password: this.password
        };

        this.authService.registerAdmin(admin).subscribe(res => {
            if(res.success) {
                console.log('TODO: Angular snackbar');
                this.router.navigate(['admin/login']);
            } else {
                console.log('TODO: Angular material snackbar');
                this.router.navigate(['admin/register']);
            }
        });
    }
}
