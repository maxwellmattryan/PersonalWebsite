import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '@ui/core/auth';
import { Id } from '@ui/core/models/model';
import {
    NotificationService,
    ValidationService,
    SeoService, TrackingService
} from '@ui/core/services';

import {
    PortfolioProfile,
    PortfolioProject
} from '../../models';
import {
    PortfolioApiService,
    PortfolioComparisonService,
    PortfolioEditorService
} from '../../services';

@Component({
    selector: 'ui-portfolio-project-editor',
    templateUrl: './portfolio-project-editor.component.html'
})
export class PortfolioProjectEditorComponent implements OnDestroy, OnInit {
    profileData: PortfolioProfile[] = [];
    projectData: PortfolioProject;

    projectForm: FormGroup;

    isLoaded: boolean = false;

    constructor(
        private authService: AuthService,
        private cdRef: ChangeDetectorRef,
        private notificationService: NotificationService,
        private portfolioApiService: PortfolioApiService,
        private portfolioComparisonService: PortfolioComparisonService,
        private portfolioEditorService: PortfolioEditorService,
        private seoService: SeoService,
        private titleService: Title,
        public trackingService: TrackingService,
        private validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
    }

    ngOnDestroy(): void {
        this.portfolioEditorService.setProject(null);
    }

    ngOnInit(): void {
        this.titleService.setTitle('Portfolio Project Editor | Matthew Maxwell')

        this.checkForAdmin();

        this.setPageHideEvent();

        this.initProjectForm();
    }

    private checkForAdmin(): void {
        if (!this.authService.isLoggedIn())
            this.router.navigate(['']);
    }

    private setPageHideEvent(): void {
        window.onpagehide = () => {
            this.portfolioEditorService.setProject(null);
        };
    }

    private initProjectForm(): void {
        this.loadProjectData();
        this.loadProfileData();

        this.buildProjectForm();
    }

    private loadProjectData(): void {
        this.projectData = this.portfolioEditorService.getProject();
    }

    private loadProfileData(): void {
        this.portfolioApiService.getProfiles().subscribe((res: PortfolioProfile[]) => {
            this.profileData = res.sort(this.portfolioComparisonService.profiles);

            if (this.projectData) {
                this.setProfileControls(this.projectData.profiles.map(p => p.id));
            } else {
                this.setProfileControls([]);
            }

            this.isLoaded = true;
        });
    }

    private setProfileControls(associatedProfileIds: Id[]): void {
        this.profileData.forEach(p => {
            const control: FormControl = this.formBuilder.control(associatedProfileIds.includes(p.id));
            (this.projectForm.controls.profiles as FormArray).push(control);
        });
    }

    private buildProjectForm(): void {
        if (this.projectData) {
            this.projectForm = this.formBuilder.group({
                name: this.formBuilder.control(this.projectData.name, [Validators.required]),
                profiles: this.formBuilder.array(this.profileData, [this.validationService.hasMinElements()]),
                tagline: this.formBuilder.control(this.projectData.tagline, [Validators.required]),
                description: this.formBuilder.control(this.projectData.description, [Validators.required]),
                image_url: this.formBuilder.control(this.projectData.image_url, [Validators.required]),
                link_name: this.formBuilder.control(this.projectData.link_name, [Validators.required]),
                link_url: this.formBuilder.control(this.projectData.link_url, [Validators.required])
            });
        } else {
            this.projectForm = this.formBuilder.group({
                name: this.formBuilder.control('', [Validators.required]),
                profiles: this.formBuilder.array([], [this.validationService.hasMinElements()]),
                tagline: this.formBuilder.control('', [Validators.required]),
                description: this.formBuilder.control('', [Validators.required]),
                image_url: this.formBuilder.control('', [Validators.required]),
                link_name: this.formBuilder.control('', [Validators.required]),
                link_url: this.formBuilder.control('', [Validators.required])
            });
        }
    }

    onSubmit(): void {
        const project = this.buildFormProjectData();

        if (project.id === undefined) {
            this.portfolioApiService.createProject(project).subscribe((res: PortfolioProject) => {
                this.notificationService.createNotification(`Successfully created new portfolio project!`);
                this.router.navigate([`projects/${ this.seoService.getCanonicalUrl(res.id, res.name) }`]);
            });
        } else {
            this.portfolioApiService.updateProject(project).subscribe((res: PortfolioProject) => {
                this.notificationService.createNotification(`Successfully updated existing portfolio project!`);
                this.router.navigate([`projects/${ this.seoService.getCanonicalUrl(res.id, res.name) }`]);
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
            if (p) return this.profileData[idx];
        }).filter(p => p !== undefined);
    }
}
