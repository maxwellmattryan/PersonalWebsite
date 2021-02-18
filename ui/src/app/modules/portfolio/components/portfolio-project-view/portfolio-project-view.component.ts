import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '@ui/core/auth';
import { NotificationService, SeoService } from '@ui/core/services';

import { PortfolioProject } from '../../models';
import { PortfolioApiService, PortfolioEditorService } from '../../services';

@Component({
    selector: 'ui-portfolio-project-view',
    templateUrl: './portfolio-project-view.component.html',
    styleUrls: ['./portfolio-project-view.component.scss']
})
export class PortfolioProjectViewComponent implements OnInit {
    isAdmin: boolean = false;
    isLoaded: boolean = false;

    project: PortfolioProject;

    constructor(
        private authService: AuthService,
        private notificationService: NotificationService,
        private portfolioProjectApiService: PortfolioApiService,
        private portfolioProjectEditorService: PortfolioEditorService,
        public seoService: SeoService,
        private titleService: Title,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();

        const projectId = this.seoService.getIdFromUrl(this.router.url);
        if(!projectId) {
            this.notificationService.createNotification('Unable to find portfolio project ID.');
            this.router.navigate(['']);
            return;
        }

        this.portfolioProjectApiService.getProject(projectId).subscribe((res: PortfolioProject) => {
            this.project = res;

            this.titleService.setTitle(`${res.name} - ${res.tagline} | Portfolio | Matthew Maxwell`);

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
            this.router.navigate(['']);
        });
    }

    sendProjectToEditor(): void {
        this.portfolioProjectEditorService.setProject(this.project);
    }

    deleteProject(): void {
        if(!window.confirm(`Are you sure you want to delete this project?`)) return;

        this.portfolioProjectApiService.deleteProject(this.project.id).subscribe((res: any) => {
            this.notificationService.createNotification('Successfully deleted the project!');
            this.router.navigate(['']);
        });
    }
}
