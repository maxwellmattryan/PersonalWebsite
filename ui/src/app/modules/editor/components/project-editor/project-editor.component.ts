import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Profile, Project } from '@app/shared/models';
import { AuthService } from '@app/core/auth';
import { ApiService } from '@app/core/http';
import {
    EditorService,
    NotificationService,
    ValidationService,
    ComparisonService,
    SeoService
} from '@app/core/services';

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

    isLoaded: boolean = false;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private cdRef: ChangeDetectorRef,
        private comparisonService: ComparisonService,
        private editorService: EditorService,
        private notificationService: NotificationService,
        private seoService: SeoService,
        private titleService: Title,
        private validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnDestroy(): void {
        this.editorService.setProject(null);
    }

    ngOnInit(): void {
        this.titleService.setTitle('Portfolio Project Editor | Matthew Maxwell')

        this.checkForAdmin();

        this.setPageHideEvent();

        this.initProjectForm();
    }

    private checkForAdmin(): void {
        if(!this.authService.isLoggedIn())
            this.router.navigate(['']);
    }

    private setPageHideEvent(): void {
        window.onpagehide = () => {
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

            if(this.id && this.projectData) {
                this.setProfileControls(this.projectData.profiles.map(p => p.id));
            } else {
                this.setProfileControls([]);
            }

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    private setProfileControls(associatedProfileIds: number[]): void {
        this.profileData.forEach(p => {
            const control: FormControl = this.formBuilder.control(associatedProfileIds.includes(p.id));
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
                link_name:      this.formBuilder.control(this.projectData.link_name,   [Validators.required]),
                link_url:       this.formBuilder.control(this.projectData.link_url,    [Validators.required])
            });
        } else {
            this.projectForm = this.formBuilder.group({
                name:           this.formBuilder.control('', [Validators.required]),
                profiles:       this.formBuilder.array  ([], [this.validationService.hasMinElements()]),
                tagline:        this.formBuilder.control('', [Validators.required]),
                description:    this.formBuilder.control('', [Validators.required]),
                image_url:      this.formBuilder.control('', [Validators.required]),
                link_name:      this.formBuilder.control('', [Validators.required]),
                link_url:       this.formBuilder.control('', [Validators.required])
            });
        }
    }

    onSubmit(): void {
        const project = this.buildFormProjectData();

        if(project.id === undefined) {
            this.apiService.createProject(project).subscribe((res: Project) => {
                this.notificationService.createNotification(`Successfully created new project!`);
                this.router.navigate([`projects/${this.seoService.getCanonicalUrl(res.id, res.name)}`]);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        } else {
            this.apiService.updateProject(project).subscribe((res: Project) => {
                this.notificationService.createNotification(`Successfully updated existing project!`);
                this.router.navigate([`projects/${this.seoService.getCanonicalUrl(res.id, res.name)}`]);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        }
    }

    private buildFormProjectData(): Project {
        const profiles = this.buildFormProfileData();

        return new Project({
            ...this.projectForm.value,
            id: this.projectData ? this.projectData.id : undefined,
            profiles: profiles
        });
    }

    private buildFormProfileData(): Profile[] {
        return this.projectForm.value.profiles.map((p, idx) => {
            if(p) return this.profileData[idx];
        }).filter(p => p !== undefined);
    }
}
