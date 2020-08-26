import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Profile } from '@app/shared/models';
import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/authentication';
import { NotificationService, ProfileService, ComparisonService } from '@app/core/services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(
        private router: Router,
        private apiService: ApiService,
        public authService: AuthService,
        private comparisonService: ComparisonService,
        private notificationService: NotificationService,
        public profileService: ProfileService
    ) { }

    ngOnInit(): void {
        // this.apiService.getProfiles().subscribe(profiles => {
        //     this.profileService.setProfiles(profiles.sort(this.comparisonService.profiles));
        // });
    }

    changeProfile(profile: Profile): void {
        if(profile.status ) return;

        profile = this.profileService.activateProfile(profile);

        this.apiService.putProfile(profile).subscribe(res => {
            this.notificationService.createNotification(res.msg);
        });
    }

    onLogoutClick(): void {
        this.apiService.logoutAdmin().subscribe(res => {
            this.notificationService.createNotification(`Bye, ${this.authService.getAdmin()}!`);
            this.authService.logoutAdmin();
            this.router.navigate(['']);
        });
    }
}
