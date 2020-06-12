import { Component, OnInit } from '@angular/core';

import { Profile } from '@app/shared/models';
import { ProfileService } from '@app/core/services';

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