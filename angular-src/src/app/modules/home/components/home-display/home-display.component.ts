import { Component, OnInit } from '@angular/core';

import { Profile } from '@app/shared/models';
import { ApiService } from '@app/core/http';

@Component({
    selector: 'app-home-display',
    templateUrl: './home-display.component.html',
    styleUrls: ['./home-display.component.scss']
})
export class HomeDisplayComponent implements OnInit {
    isLoaded: boolean = false;

    profile: Profile;

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.apiService.getProfile().subscribe(profile => {
            this.isLoaded = true;
            this.profile = profile[0];
        });
    }
}