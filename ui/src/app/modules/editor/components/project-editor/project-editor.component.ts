import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
    projectData: Project;
    projectForm: FormGroup;

    profiles: Array<Profile> = [];

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

    checkForAdmin(): void {
        if(!this.authService.isLoggedIn())
            this.router.navigate(['']);
    }

    setUnloadEvent(): void {
        window.onbeforeunload = () => {
            this.editorService.setProject(null);
        };
    }

    initProjectForm(): void {
        this.loadProjectData();

        this.buildProjectForm();

        // this.loadProfileFormData();
    }

    loadProjectData(): void {
        this.projectData = this.editorService.getProject();
    }

    buildProjectForm(): void {
        if(this.projectData) {
            this.projectForm = this.formBuilder.group({
                name:           this.formBuilder.control(this.projectData.name,         [Validators.required]),
                tagline:        this.formBuilder.control(this.projectData.tagline,      [Validators.required]),
                description:    this.formBuilder.control(this.projectData.description,  [Validators.required]),
                image_url:      this.formBuilder.control(this.projectData.image_url,    [Validators.required]),
                external_url:   this.formBuilder.control(this.projectData.external_url, [Validators.required]),
            });
        } else {
            this.projectForm = this.formBuilder.group({
                name:           this.formBuilder.control('',[Validators.required]),
                tagline:        this.formBuilder.control('',[Validators.required]),
                description:    this.formBuilder.control('',[Validators.required]),
                image_url:      this.formBuilder.control('',[Validators.required]),
                external_url:   this.formBuilder.control('',[Validators.required]),
            });
        }
    }

    // loadProfileFormData(): void {
    //     this.apiService.getProfiles().subscribe(profiles => {
    //         this.profiles = profiles.sort(this.comparisonService.profiles);
    //
    //         this.profiles.forEach((profile, idx) => {
    //             let control: FormControl;
    //
    //             if(this.projectData && this.projectData.profiles.map(p => p.name).includes(profile.name)) {
    //                 control = this.formBuilder.control(true);
    //             } else {
    //                 control = this.formBuilder.control(false);
    //             }
    //
    //             (this.projectForm.controls.profiles as FormArray).push(control);
    //         });
    //     });
    // }

    onSubmit(): void {
        const project = this.buildProjectFormData();

        if(project.id === undefined) {
            this.apiService.createProject(project).subscribe((res: Project) => {
                this.notificationService.createNotification(`Successfully created new project!`);
                this.router.navigate([`projects/${res.id}`]);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        } else {
            this.apiService.updateProject(project).subscribe((res: Project) => {
                this.notificationService.createNotification(`Successfully updated existing project!`);
                this.router.navigate([`projects/${res.id}`]);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        }
    }

    buildProjectFormData(): Project {
        return new Project({ ...this.projectForm.value, id: this.projectData ? this.projectData.id : undefined });
    }

    getSelectedProfiles(): any {
        return this.projectForm.value.profiles
            .map((profile, idx) => profile ? this.profiles[idx].id : null)
            .filter(profile => profile !== null);
    }
}
