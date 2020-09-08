import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Profile, ProfileStatus } from '@app/shared/models';
import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/auth';
import { NotificationService, ComparisonService, EditorService } from '@app/core/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    profiles: Profile[];

    isLoaded: boolean = false;

    constructor(
        private router: Router,
        private apiService: ApiService,
        public authService: AuthService,
        private comparisonService: ComparisonService,
        private editorService: EditorService,
        public notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        if(this.authService.isLoggedIn()) {
            this.populateProfiles();
        } else {
            this.isLoaded = true;
        }
    }

    populateProfiles(): void {
        this.apiService.getProfiles().subscribe((res: Profile[]) => {
            this.profiles = res.sort(this.comparisonService.profiles);

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    changeProfile(profile: Profile): void {
        if(profile.status.status === 'ACTIVE') return;

        this.apiService.activateProfile(profile.id).subscribe((res: Profile) => {
            this.modifyProfileStatuses(res.id);
            this.notificationService.createNotification(`Successfully activated the "${res.name}" profile!`);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    private modifyProfileStatuses(activeId: number): void {
        this.profiles.forEach(p => {
            if(p.id === activeId) {
                p.status = new ProfileStatus({ status: 'ACTIVE' });
            } else {
                p.status = new ProfileStatus({ status: 'INACTIVE' });
            }
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
        if(this.profiles.length === 1) {
            this.notificationService.createNotification('Cannot delete only existing profile.');
            return;
        }

        this.apiService.deleteProfile(profile.id).subscribe((res: any) => {
            this.profiles = this.profiles.filter(p => p.id !== profile.id);
            this.notificationService.createNotification('Successfully delete profile!');
            if(profile.status.status === 'ACTIVE') location.reload();
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }
}
