import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '@ui/core/auth';
import {
    ComparisonService,
    EditorService,
    NotificationService,
    ValidationService,
    TrackingService
} from '@ui/core/services';
import {
    PortfolioProfile,
    PortfolioProfileStatus,
    PortfolioProfileTechnology,
    PortfolioProject
} from '@ui/modules/portfolio/models';
import {
    PortfolioProfileApiService,
    PortfolioProfileService,
    PortfolioProjectApiService
} from '@ui/modules/portfolio/services';

@Component({
    selector: 'app-portfolio-profile-editor',
    templateUrl: './portfolio-profile-editor.component.html'
})
export class PortfolioProfileEditorComponent implements OnDestroy, OnInit {
    profileData: PortfolioProfile;
    projectData: PortfolioProject[] = [];
    statusData: PortfolioProfileStatus[] = [];
    technologyData: PortfolioProfileTechnology[] = [];

    profileForm: FormGroup;

    isLoaded: boolean = false;

    constructor(
        private router: Router,
        private changeDetectionRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private comparisonService: ComparisonService,
        private editorService: EditorService,
        private notificationService: NotificationService,
        private portfolioProfileService: PortfolioProfileService,
        private portfolioProfileApiService: PortfolioProfileApiService,
        private portfolioProjectApiService: PortfolioProjectApiService,
        private titleService: Title,
        public trackingService: TrackingService,
        private validationService: ValidationService
    ) { }

    ngOnDestroy(): void {
        this.editorService.setProfile(null);
    }

    ngOnInit(): void {
        this.titleService.setTitle('Portfolio Profile Editor | Matthew Maxwell');

        this.checkForAdmin();

        this.setPageHideEvent();

        this.initProfileForm();

        this.isLoaded = true;
    }

    private checkForAdmin(): void {
        if(!this.authService.isLoggedIn())
            this.router.navigate(['']);
    }

    private setPageHideEvent(): void {
        window.onpagehide = () => {
            this.editorService.setProfile(null);
        }
    }

    private initProfileForm(): void {
        this.loadProfileData();
        this.loadProjectData();
        this.loadStatusData();
        this.loadTechnologyData();

        this.buildProfileForm();
    }

    private loadProfileData(): void {
        this.profileData = this.editorService.getProfile();
    }

    private loadProjectData(): void {
        this.portfolioProjectApiService.getProjects().subscribe((res: PortfolioProject[]) => {
            this.projectData = res.sort(this.comparisonService.projects);

            if(this.profileData) {
                this.setProjectControls(this.profileData.projects.map(p => p.id));
            } else {
                this.setProjectControls([]);
            }

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    private setProjectControls(associatedProjectIds: number[]): void {
        this.projectData.forEach(p => {
            const control: FormControl = this.formBuilder.control(associatedProjectIds.includes(p.id));
            (this.profileForm.controls.projects as FormArray).push(control);
        });
    }

    private loadStatusData(): void {
        this.portfolioProfileApiService.getProfileStatuses().subscribe((res: PortfolioProfileStatus[]) => {
            this.statusData = res;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    private loadTechnologyData(): void {
        if(this.profileData) this.technologyData = this.profileData.technologies.sort(this.comparisonService.profileTechnologies);
    }

    private buildProfileForm(): void {
        if(this.profileData) {
            this.profileForm = this.formBuilder.group({
                name:         this.formBuilder.control(this.profileData.name,                [Validators.required]),
                status:       this.formBuilder.control(this.profileData.status.status,       [Validators.required]),
                projects:     this.formBuilder.array  (this.projectData,                     [this.validationService.hasMinElements(1)]),
                tagline:      this.formBuilder.control(this.profileData.tagline,             [Validators.required]),
                landing:      this.formBuilder.control(this.profileData.landing,             [Validators.required]),
                about:        this.formBuilder.control(this.profileData.about,               [Validators.required]),
                technologies: this.formBuilder.array  (this.technologyData.map(t => t.name), [Validators.required]),
                image_url:    this.formBuilder.control(this.profileData.image_url,           [Validators.required])
            });
        } else {
            this.profileForm = this.formBuilder.group({
                name:         this.formBuilder.control('',         [Validators.required]),
                status:       this.formBuilder.control('ACTIVE',   [Validators.required]),
                projects:     this.formBuilder.array  ([],         [this.validationService.hasMinElements(1)]),
                tagline:      this.formBuilder.control('',         [Validators.required]),
                landing:      this.formBuilder.control('',         [Validators.required]),
                about:        this.formBuilder.control('',         [Validators.required]),
                technologies: this.formBuilder.array  ([''],       [Validators.required]),
                image_url:    this.formBuilder.control('',         [Validators.required])
            });
        }
    }

    onSubmit(): void {
        const profile = this.buildFormProfileData();

        if(profile.status.status === 'ACTIVE')
            this.portfolioProfileService.setActiveProfile(profile);

        if(profile.id === undefined) {
            this.portfolioProfileApiService.createProfile(profile).subscribe((res: PortfolioProfile) => {
                this.notificationService.createNotification('Successfully created new profile!');
                this.router.navigate(['admin']);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        } else {
            this.portfolioProfileApiService.updateProfile(profile).subscribe((res: PortfolioProfile) => {
                this.notificationService.createNotification('Successfully updated existing profile!');
                this.router.navigate(['admin']);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        }
    }

    private buildFormProfileData(): PortfolioProfile {
        const projects = this.buildFormProjectData();
        const status = this.buildFormStatusData();
        const technologies = this.buildFormTechnologyData();

        return new PortfolioProfile({
            ...this.profileForm.value,
            id: this.profileData ? this.profileData.id : undefined,
            projects: projects,
            status: status,
            technologies: technologies
        });
    }

    private buildFormProjectData(): PortfolioProject[] {
        return this.profileForm.value.projects.map((p, idx) => {
            if(p) return this.projectData[idx];
        }).filter(p => p !== undefined);
    }

    private buildFormStatusData(): PortfolioProfileStatus {
        return this.statusData.find(s => s.status === this.profileForm.value.status);
    }

    private buildFormTechnologyData(): PortfolioProfileTechnology[] {
        return this.profileForm.value.technologies.map((t, idx) => {
            return new PortfolioProfileTechnology({ name: t, display_order: idx + 1 });
        });
    }

    addTechnologyToForm(): void {
        const control: FormControl = this.formBuilder.control('', [Validators.required]);
        (this.profileForm.controls.technologies as FormArray).push(control);

        // CAUTION: Angular will throw an ExpressionChangedAfterItWasCheckedException after adding new control (b/c array becomes invalid)
        this.changeDetectionRef.detectChanges();
    }

    changeTechnologyDisplayOrder(oldIdx: number, newIdx: number): void {
        const technologyFormArray = this.profileForm.get('technologies') as FormArray;
        const technologies = [...technologyFormArray.value];
        [technologies[oldIdx], technologies[newIdx]] = [technologies[newIdx], technologies[oldIdx]];
        technologyFormArray.setValue(technologies);
    }

    removeTechnology(idx: number): void {
        (this.profileForm.controls.technologies as FormArray).removeAt(idx);
    }
}
