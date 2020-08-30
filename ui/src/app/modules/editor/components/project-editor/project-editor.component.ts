import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Profile, Project } from '@app/shared/models';
import { AuthService } from '@app/core/authentication';
import { ApiService } from '@app/core/http';
import { EditorService, NotificationService, ValidationService, ComparisonService } from '@app/core/services';

@Component({
    selector: 'app-project-editor',
    templateUrl: './project-editor.component.html',
    styleUrls: ['../../editor.component.scss']
})
export class ProjectEditorComponent implements OnDestroy, OnInit {
    profileData: Profile[] = [];
    projectData: Project;
    projectForm: FormGroup;

    @Input() id: number;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private cdRef: ChangeDetectorRef,
        private comparisonService: ComparisonService,
        private editorService: EditorService,
        private notificationService: NotificationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private validationService: ValidationService
    ) { }

    ngOnDestroy(): void {
        this.editorService.setProject(null);
    }

    ngOnInit(): void {
        this.checkForAdmin();

        this.setUnloadEvent();

        this.initProjectForm();
    }

    private checkForAdmin(): void {
        if(!this.authService.isLoggedIn())
            this.router.navigate(['']);
    }

    private setUnloadEvent(): void {
        window.onbeforeunload = () => {
            this.editorService.setProject(null);
        };
    }

    private initProjectForm(): void {
        this.loadProjectData();
        this.loadProfileData();

        this.buildProjectForm();
    }

    private loadProjectData(): void {
        this.projectData = this.editorService.getProject();
    }

    private loadProfileData(): void {
        this.apiService.getProfiles().subscribe((res: Profile[]) => {
            this.profileData = res.sort(this.comparisonService.profiles);
            if(!(this.id && this.projectData)) this.setProfileControls([]);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });

        if(this.id && this.projectData) {
            this.apiService.getProfilesForProject(this.id).subscribe((res: Profile[]) => {
                this.setProfileControls(res.map(p => p.id));
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            })
        }
    }

    private setProfileControls(associatedProfileIds: number[]): void {
        this.profileData.forEach((profile, idx) => {
            let control: FormControl = this.formBuilder.control(associatedProfileIds.includes(profile.id));
            (this.projectForm.controls.profiles as FormArray).push(control);
        });
    }

    private buildProjectForm(): void {
        if(this.projectData) {
            this.projectForm = this.formBuilder.group({
                name:           this.formBuilder.control(this.projectData.name,        [Validators.required]),
                profiles:       this.formBuilder.array  (this.profileData,             [this.validationService.hasMinElements()]),
                tagline:        this.formBuilder.control(this.projectData.tagline,     [Validators.required]),
                description:    this.formBuilder.control(this.projectData.description, [Validators.required]),
                image_url:      this.formBuilder.control(this.projectData.image_url,   [Validators.required]),
                link:           this.formBuilder.group  ({
                    name: this.formBuilder.control(this.projectData.link.name, [Validators.required]),
                    url:  this.formBuilder.control(this.projectData.link.url,  [Validators.required])
                })
            });
        } else {
            this.projectForm = this.formBuilder.group({
                name:           this.formBuilder.control('', [Validators.required]),
                profiles:       this.formBuilder.array  ([], [this.validationService.hasMinElements()]),
                tagline:        this.formBuilder.control('', [Validators.required]),
                description:    this.formBuilder.control('', [Validators.required]),
                image_url:      this.formBuilder.control('', [Validators.required]),
                link:           this.formBuilder.group  ({
                    name: this.formBuilder.control('', [Validators.required]),
                    url:  this.formBuilder.control('', [Validators.required])
                })
            });
        }
    }

    onSubmit(): void {
        const project = this.buildFormProjectData();
        const activeProfileIds = this.buildFormProfileData();

        if(project.id === undefined) {
            this.apiService.createProject(project, activeProfileIds).subscribe((res: Project) => {
                this.notificationService.createNotification(`Created new project.`);
                this.router.navigate([`projects/${res.id}`]);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        } else {
            this.apiService.updateProject(project, activeProfileIds).subscribe((res: Project) => {
                this.notificationService.createNotification(`Updated existing project.`);
                this.router.navigate([`projects/${res.id}`]);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        }
    }

    private buildFormProjectData(): Project {
        const project = new Project({
            ...this.projectForm.value,
            id: this.projectData ? this.projectData.id : undefined,
            profiles: undefined
        });
        project.link.id = this.projectData ? this.projectData.link.id : undefined;

        return project;
    }

    private buildFormProfileData(): number[] {
        return this.projectForm.value.profiles
            .map((p, idx) => p ? this.profileData[idx].id : undefined)
            .filter(p => p !== undefined);
    }
}
