import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Profile } from '@app/shared/models';
import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/authentication';
import { NotificationService, ProfileService, ComparisonService, EditorService } from '@app/core/services';
import { HttpErrorResponse } from '@angular/common/http';

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
        private editorService: EditorService,
        private notificationService: NotificationService,
        public profileService: ProfileService
    ) { }

    ngOnInit(): void {
        if(this.authService.isLoggedIn()) {
            this.populateProfiles();
        }
    }

    populateProfiles(): void {
        this.apiService.getProfiles().subscribe((res: Profile[]) => {
            this.profileService.setProfiles(res.sort(this.comparisonService.profiles));
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    changeProfile(profile: Profile): void {
        if(profile.status.status === 'ACTIVE') return;

        this.apiService.activateProfile(profile.id).subscribe((res: Profile) => {
            profile = this.profileService.activateProfile(profile);
            this.notificationService.createNotification(`Successfully activated the "${res.name}" profile!`);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    onLogoutClick(): void {
        this.apiService.logoutAdmin().subscribe(res => {
            this.notificationService.createNotification(`Bye, ${this.authService.getAdmin()}!`);
            this.authService.logoutAdmin();
            this.router.navigate(['admin']);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    sendProfileToEditor(profile: Profile): void {
        this.editorService.setProfile(profile);
    }

    deleteProfile(profile: Profile): void {
        // API REQUEST FOR DELETING PROFILE
    }
}
