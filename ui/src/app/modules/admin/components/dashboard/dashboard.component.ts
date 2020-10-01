import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthApiService, AuthService } from '@ui/core/auth';
import {
    NotificationService,
    TrackingService
} from '@ui/core/services';
import {
    PortfolioProfile,
    PortfolioProfileStatus
} from '@ui/modules/portfolio/models';
import {
    PortfolioApiService, PortfolioComparisonService, PortfolioEditorService,
    PortfolioProfileService
} from '@ui/modules/portfolio/services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    profiles: PortfolioProfile[];

    isLoaded: boolean = false;

    constructor(
        private router: Router,
        private authApiService: AuthApiService,
        public authService: AuthService,
        public notificationService: NotificationService,
        private portfolioApiService: PortfolioApiService,
        private portfolioComparisonService: PortfolioComparisonService,
        private portfolioEditorService: PortfolioEditorService,
        private portfolioProfileService: PortfolioProfileService,
        private titleService: Title,
        public trackingService: TrackingService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle(`Admin Dashboard | Matthew Maxwell`);

        if(this.authService.isLoggedIn()) {
            this.populateProfiles();
        } else {
            this.isLoaded = true;
        }
    }

    populateProfiles(): void {
        this.portfolioApiService.getProfiles().subscribe((res: PortfolioProfile[]) => {
            this.profiles = res.sort(this.portfolioComparisonService.profiles);
            this.setActiveProfile();

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    private setActiveProfile(): void {
        const activeProfile = this.profiles.find(p => p.status.status === 'ACTIVE');
        this.portfolioProfileService.setActiveProfile(activeProfile);
    }

    changeProfile(profile: PortfolioProfile): void {
        if(profile.status.status === 'ACTIVE') return;

        this.portfolioApiService.activateProfile(profile.id).subscribe((res: PortfolioProfile) => {
            this.portfolioProfileService.setActiveProfile(res);

            this.modifyProfileStatuses(res.id);
            this.notificationService.createNotification(`Successfully activated the "${res.name}" profile!`);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    private modifyProfileStatuses(activeId: number): void {
        this.profiles.forEach(p => {
            if(p.id === activeId) {
                p.status = new PortfolioProfileStatus({ status: 'ACTIVE' });
            } else {
                p.status = new PortfolioProfileStatus({ status: 'INACTIVE' });
            }
        });
    }

    onLogoutClick(): void {
        this.authApiService.logoutAdmin().subscribe(res => {
            this.notificationService.createNotification(`Bye, ${this.authService.getAdmin()}!`);
            this.authService.logoutAdmin();
            this.router.navigate(['admin']);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    sendProfileToEditor(profile: PortfolioProfile): void {
        this.portfolioEditorService.setProfile(profile);
    }

    deleteProfile(profile: PortfolioProfile): void {
        if(this.profiles.length === 1) {
            this.notificationService.createNotification('Cannot delete only existing profile.');
            return;
        }

        this.portfolioApiService.deleteProfile(profile.id).subscribe((res: any) => {
            this.profiles = this.profiles.filter(p => p.id !== profile.id);
            this.notificationService.createNotification('Successfully delete profile!');
            if(profile.status.status === 'ACTIVE') location.reload();
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }
}
