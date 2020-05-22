import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from '../../services/validation.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;

    constructor(
        private router: Router,
        private authService: AuthService,
        private flashMessagesService: FlashMessagesService,
        private validationService: ValidationService
    ) { }

    ngOnInit(): void {
    }

    onLoginSubmit() {
        const admin = {
            username: this.username,
            password: this.password
        };

        if (!this.validationService.isValidCredentials(admin)) {
            this.flashMessagesService.show('Please provide a username AND password !', {
                cssClass: 'alert-danger', 
                timeout: 2000 
            });
            return false;
        }

        this.authService.authenticateAdmin(admin).subscribe(res => {
            console.log(res);
            if(res.success) {
                this.authService.storeAdminData(res.token, res.admin);

                this.flashMessagesService.show(res.msg, {
                    cssClass: 'alert-success', 
                    timeout: 2000 
                });
                this.router.navigate(['admin']);
            } else {
                this.flashMessagesService.show(res.msg, { 
                    cssClass: 'alert-danger', 
                    timeout: 2000 
                });
                this.router.navigate(['admin/login']);
            }
        });
    }
}
