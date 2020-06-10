import { Component, OnInit } from '@angular/core';

import { Profile } from 'models';
import { ProfileService } from 'services';

@Component({
    selector: 'app-home-display',
    templateUrl: './home-display.component.html',
    styleUrls: ['./home-display.component.scss']
})
export class HomeDisplayComponent implements OnInit {
    isLoaded: boolean = false;

    profile: Profile;

    constructor(
        private profileService: ProfileService
    ) { }

    ngOnInit(): void {
        this.profileService.getProfileData().subscribe(profile => {
            this.isLoaded = true;
            this.profile = profile[0];
        });
    }
}