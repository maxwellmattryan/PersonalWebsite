import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../../services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    isLoaded: boolean = false;
    profileData: object;

    constructor(private profileService: ProfileService) { }

    ngOnInit(): void {
        this.profileData = this.profileService.getProfileData().subscribe(result => {
            this.isLoaded = true;
            this.profileData = new Object(result[0]);
        });
    }
}
