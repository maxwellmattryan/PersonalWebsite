import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }

    toggleSideMenu(): void {
        console.log('TODO: Add functional side menu (only mobile).');
    }
}