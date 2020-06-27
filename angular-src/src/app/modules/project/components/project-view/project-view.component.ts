import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/authentication';
import { EditorService, NotificationService } from '@app/core/services';
import { Project } from '@app/shared/models';

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
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();

        this.apiService.getProject(this.router.url).subscribe(project => {
            this.project = project;
            
            this.isLoaded = true;
        });
    }

    sendProjectToEditor(): void {
        this.editorService.setProject(this.project);
    }

    deleteProject(): void {
        this.apiService.deleteProject(this.router.url, this.authService.getAuthHeaders()).subscribe((res: any) => {
            this.notificationService.createNotification(res.msg);
            
            this.router.navigate(['']);
        });
    }
}