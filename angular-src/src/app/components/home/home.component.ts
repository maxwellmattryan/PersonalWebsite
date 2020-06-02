import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../../services';
import { Profile } from 'src/app/models';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    isLoaded: boolean = false;
    profileData: Profile;

    constructor(private profileService: ProfileService) { }

    ngOnInit(): void {
        this.profileService.getProfileData().subscribe(result => {
            this.isLoaded = true;
            this.profileData = result[0];
        });
    }
}
