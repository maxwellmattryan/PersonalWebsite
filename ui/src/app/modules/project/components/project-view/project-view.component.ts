import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/auth';
import { EditorService, NotificationService, SeoService } from '@app/core/services';
import { Project } from '@app/shared/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-project-view',
    templateUrl: './project-view.component.html',
    styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
    isAdmin: boolean = false;
    isLoaded: boolean = false;

    project: Project;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private editorService: EditorService,
        private notificationService: NotificationService,
        private seoService: SeoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();

        // NOTE: Remove when the project page has been integrated (eh?)
        if(!this.isAdmin) {
            this.router.navigate(['']);
        }

        const projectId = this.seoService.getIdFromUrl(this.router.url);
        if(!projectId) {
            this.notificationService.createNotification('Unable to find project ID.');
            this.router.navigate(['']);
            return;
        }

        this.apiService.getProject(projectId).subscribe(project => {
            this.project = project;

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
