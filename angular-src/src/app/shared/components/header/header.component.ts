import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/authentication';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAdmin: boolean = false;

    shouldDisplaySidebar: boolean = false;
    shouldDisplayNavbar: boolean = true;

    private previousPageYOffset: number = 0;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.onRouterEvents();
    }

    onRouterEvents(): void {
        this.router.events.subscribe((data) => {
            this.isAdmin = this.authService.isLoggedIn();
        });
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        this.checkPageOffset();
    }

    checkPageOffset(): void {
        this.shouldDisplayNavbar = window.pageYOffset < this.previousPageYOffset;
        this.previousPageYOffset = window.pageYOffset;
    }

    toggleSidebar(): void {
        this.shouldDisplaySidebar = !this.shouldDisplaySidebar;
    }
}