import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/auth';
import {
    EditorService,
    NotificationService,
    ValidationService,
    ComparisonService,
    SeoService, TrackingService
} from '@app/core/services';
import {
    PortfolioProfile,
    PortfolioProject
} from '../../models';
import {
    PortfolioProfileApiService,
    PortfolioProjectApiService, PortfolioProjectEditorService
} from '../../services';

@Component({
    selector: 'app-portfolio-project-editor',
    templateUrl: './portfolio-project-editor.component.html',
})
export class PortfolioProjectEditorComponent implements OnDestroy, OnInit {
    profileData: PortfolioProfile[] = [];
    projectData: PortfolioProject;

    projectForm: FormGroup;

    isLoaded: boolean = false;

    constructor(
        private authService: AuthService,
        private cdRef: ChangeDetectorRef,
        private comparisonService: ComparisonService,
        private portfolioProjectEditorService: PortfolioProjectEditorService,
        private notificationService: NotificationService,
        private portfolioProfileApiService: PortfolioProfileApiService,
        private portfolioProjectApiService: PortfolioProjectApiService,
        private seoService: SeoService,
        private titleService: Title,
        public trackingService: TrackingService,
        private validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnDestroy(): void {
        this.portfolioProjectEditorService.setProject(null);
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
            this.portfolioProjectEditorService.setProject(null);
        };
    }

    private initProjectForm(): void {
        this.loadProjectData();
        this.loadProfileData();

        this.buildProjectForm();
    }

    private loadProjectData(): void {
        this.projectData = this.portfolioProjectEditorService.getProject();
    }

    private loadProfileData(): void {
        this.portfolioProfileApiService.getProfiles().subscribe((res: PortfolioProfile[]) => {
            this.profileData = res.sort(this.comparisonService.profiles);

            if(this.projectData) {
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
            this.portfolioProjectApiService.createProject(project).subscribe((res: PortfolioProject) => {
                this.notificationService.createNotification(`Successfully created new portfolio project!`);
                this.router.navigate([`projects/${this.seoService.getCanonicalUrl(res.id, res.name)}`]);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        } else {
            this.portfolioProjectApiService.updateProject(project).subscribe((res: PortfolioProject) => {
                this.notificationService.createNotification(`Successfully updated existing portfolio project!`);
                this.router.navigate([`projects/${this.seoService.getCanonicalUrl(res.id, res.name)}`]);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        }
    }

    private buildFormProjectData(): PortfolioProject {
        const profiles = this.buildFormProfileData();

        return new PortfolioProject({
            ...this.projectForm.value,
            id: this.projectData ? this.projectData.id : undefined,
            profiles: profiles
        });
    }

    private buildFormProfileData(): PortfolioProfile[] {
        return this.projectForm.value.profiles.map((p, idx) => {
            if(p) return this.profileData[idx];
        }).filter(p => p !== undefined);
    }
}
