import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/auth';
import { EditorService, NotificationService, SeoService } from '@app/core/services';
import { PortfolioProject } from '../../models';

@Component({
    selector: 'app-project-view',
    templateUrl: './project-view.component.html',
    styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
    isAdmin: boolean = false;
    isLoaded: boolean = false;

    project: PortfolioProject;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private editorService: EditorService,
        private notificationService: NotificationService,
        public seoService: SeoService,
        private titleService: Title,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();

        const projectId = this.seoService.getIdFromUrl(this.router.url);
        if(!projectId) {
            this.notificationService.createNotification('Unable to find project ID.');
            this.router.navigate(['']);
            return;
        }

        this.apiService.getProject(projectId).subscribe((res: PortfolioProject) => {
            this.project = res;

            this.titleService.setTitle(`${res.name} - ${res.tagline} | Portfolio | Matthew Maxwell`);

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
            this.router.navigate(['']);
        });
    }

    sendProjectToEditor(): void {
        this.editorService.setProject(this.project);
    }

    deleteProject(): void {
        this.apiService.deleteProject(this.project.id).subscribe((res: any) => {
            this.notificationService.createNotification('Successfully deleted the project!');
            this.router.navigate(['']);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }
}
