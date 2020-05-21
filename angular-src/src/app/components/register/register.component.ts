import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from '../../services/validation.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    username: String;
    password: String;

    constructor(
        private router: Router,
        private authService: AuthService,
        private validationService: ValidationService,
        private flashMessagesService: FlashMessagesService
    ) { }

    ngOnInit() {
    }

    onRegisterSubmit() {
        const admin = {
            username: this.username,
            password: this.password
        };
        
        if (!this.validationService.validateRegistration(admin)) {
            this.flashMessagesService.show('Please provide a username AND password !', { cssClass: 'alert-danger', timeout: 2000 });
            return false;
        }

        this.authService.registerAdmin(admin).subscribe(res => {
            if (res.success) {
                this.flashMessagesService.show('Admin was successfully registered !', { cssClass: 'alert-success', timeout: 2000 });
                this.router.navigate(['/admin/login']);
            } else {
                this.flashMessagesService.show('Something went wrong ...', { cssClass: 'alert-danger', timeout: 2000 });
                this.router.navigate(['/admin/register']);
            }
        });
    }
}