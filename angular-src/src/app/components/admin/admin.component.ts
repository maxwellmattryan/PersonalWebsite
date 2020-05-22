import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService,
        private flashMessagesService: FlashMessagesService,
    ) { }

    ngOnInit(): void {
    }

    onLogoutClick() {
        if(!this.authService.isAdmin()) {
            this.flashMessagesService.show('Already logged out.', {
                cssClass: 'alert-danger',
                timeout: 2000
            });
        } else {
            this.authService.logoutAdmin();

            this.flashMessagesService.show('Successfully logged out.', {
                cssClass: 'alert-success',
                timeout: 2000
            });
        }
        this.router.navigate(['/admin']);
    }
}
