import { Component, OnInit } from '@angular/core';

import { Profile } from '@app/shared/models';
import { ApiService } from '@app/core/http';

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
    isLoaded: boolean = false;

    profile: Profile;

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.apiService.getProfile().subscribe(profile => {
            this.isLoaded = true;
            this.profile = profile;
        });
    }
}