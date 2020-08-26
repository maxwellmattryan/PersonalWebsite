import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { External } from '@app/shared/interfaces';
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
    externals: Array<External> = [];

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
            this.router.navigate(['/']);
    }

    setUnloadEvent(): void {
        window.onbeforeunload = () => {
            this.editorService.setProject(null);
        };
    }

    initProjectForm(): void {
        this.loadProjectData();

        this.buildProjectForm();

        this.loadProfileFormData();
        this.loadExternalFormData();
    }

    loadProjectData(): void {
        this.projectData = this.editorService.getProject();
    }

    buildProjectForm(): void {
        if(this.projectData) {
            this.projectForm = this.formBuilder.group({
                title:          this.formBuilder.control(this.projectData.title,        [Validators.required]                   ),
                subtitle:       this.formBuilder.control(this.projectData.subtitle,     [Validators.required]                   ),
                profiles:       this.formBuilder.array  ([],                            this.validationService.hasMinProfiles(1)),
                preview:        this.formBuilder.control(this.projectData.preview,      [Validators.required]                   ),
                description:    this.formBuilder.control(this.projectData.description,  [Validators.required]                   ),
                imageURL:       this.formBuilder.control(this.projectData.imageURL,     [Validators.required]                   ),
                externals:      this.formBuilder.array  ([]                                                                     )
            });
        } else {
            this.projectForm = this.formBuilder.group({
                title:          this.formBuilder.control('', [Validators.required]                      ),
                subtitle:       this.formBuilder.control('', [Validators.required]                      ),
                profiles:       this.formBuilder.array  ([], this.validationService.hasMinProfiles(1)   ),
                preview:        this.formBuilder.control('', [Validators.required]                      ),
                description:    this.formBuilder.control('', [Validators.required]                      ),
                imageURL:       this.formBuilder.control('', [Validators.required]                      ),
                externals:      this.formBuilder.array  ([]                                             )
            });
        }
    }

    loadProfileFormData(): void {
        this.apiService.getProfiles().subscribe(profiles => {
            this.profiles = profiles.sort(this.comparisonService.profiles);

            this.profiles.forEach((profile, idx) => {
                let control: FormControl;

                if(this.projectData && this.projectData.profiles.map(p => p.name).includes(profile.name)) {
                    control = this.formBuilder.control(true);
                } else {
                    control = this.formBuilder.control(false);
                }

                (this.projectForm.controls.profiles as FormArray).push(control);
            });
        });
    }

    loadExternalFormData(): void {
        if(this.projectData) {
            this.projectData.externals.forEach((external, idx) => {
                this.addExternal(external.name, external.URL);
            });
        } else {
            this.addExternal();
        }
    }

    addExternal(name: string = '', URL: string = ''): void {
        (this.projectForm.controls.externals as FormArray).push(this.formBuilder.group({
            name:   this.formBuilder.control(name,  [Validators.required]),
            URL:    this.formBuilder.control(URL,   [Validators.required])
        }));
    }

    deleteExternal(idx: number): void {
        if(this.getExternalArrayLength() === 1) {
            this.notificationService.createNotification('Unable to delete external (must have at least 1).');
        } else {
            (this.projectForm.controls.externals as FormArray).removeAt(idx);
        }
    }

    getExternalArrayLength(): number {
        return (this.projectForm.controls.externals as FormArray).length;
    }

    onSubmit(): void {
        const project = this.buildProjectData();

        this.apiService.putProject(project).subscribe((res: any) => {
            this.notificationService.createNotification(res.msg);

            if(res.success) {
                this.router.navigate(['projects/' + project['uri']]);
            }
        });
    }

    buildProjectData(): any {
        let project = {};
        for(let key in this.projectForm.value) {
            if(key === 'profiles') {
                project[key] = this.getSelectedProfiles();
            } else {
                project[key] = this.projectForm.value[key];
            }
        }
        project['_id'] = this.getProjectID();
        project['uri'] = this.getProjectURI(project['title']);

        return project;
    }

    getSelectedProfiles(): any {
        return this.projectForm.value.profiles
            .map((profile, idx) => profile ? this.profiles[idx]._id : null)
            .filter(profile => profile !== null);
    }

    getProjectID(): string {
        return this.projectData ? this.projectData._id : '';
    }

    getProjectURI(title: string): string {
        return title.toLowerCase().replace(/[ ]/g, '-').replace(/[\.?]/g, '');
    }
}
