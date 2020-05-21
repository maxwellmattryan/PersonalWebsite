import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService,
        private flashMessagesService: FlashMessagesService,
    ) { }

    ngOnInit(): void {
    }

    onLogoutClick() {
        this.authService.logout();
        this.flashMessagesService.show('Successfully logged out !', {
            cssClass: 'alert-success',
            timeout: 3000
        });
        this.router.navigate(['/admin']);
        return false;
    }
}
