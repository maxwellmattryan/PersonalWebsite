import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from '../../services/validation.service';

import { Post } from '../../models/post.model';
import { Topic } from '../../models/topic.model';
import { BlogService } from 'src/app/services/blog.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    topics: Array<object>;

    postFormGroup: FormGroup;
    projectFormGroup: FormGroup;
    topicFormGroup: FormGroup;

    constructor(
        private router: Router,
        private authService: AuthService,
        private blogService: BlogService,
        private validationService: ValidationService,
        private flashMessagesService: FlashMessagesService,
        private formBuilder: FormBuilder
    ) 
    { 
        this.postFormGroup = this.formBuilder.group({
            title: ['', [Validators.required]],
            subtitle: ['', [Validators.required]],
            topics: new FormArray([]),
            author: ['', [Validators.required]],
            description: ['', [Validators.required]],
            content: ['', [Validators.required]],
            imageUrls: ['', [Validators.required]]
        });

        console.log(this.postFormGroup);
    }

    ngOnInit(): void {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/']);
        } 
        
        this.blogService.getTopics().subscribe(res => {
            console.log(this.postFormGroup);
            this.topics = res;
            this.addCheckboxes();
        });
    }

    addCheckboxes() {
        console.log(this.postFormGroup);
        this.topics.forEach((topic: any, idx) => {
            const control = new FormControl(topic.name);
            (this.postFormGroup.controls.topics as FormArray).push(control);
        });
    }

    selectedTopicIDs = () => this.topics.filter((topic: any) => topic.isSelected).map((topic: any) => topic._id);

    redirectTo(uri: string) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate([uri]));
    }

    isValidFormGroup(formGroup: FormGroup): boolean {
        for(let control in formGroup.controls) {
            if(formGroup.controls[control].errors) return false;
        }

        return true;
    }

    onEditorSubmit(): void {
        console.log(this.postFormGroup);

        this.submitPost();
    }

    submitPost() {        
        if (!this.isValidFormGroup(this.postFormGroup)) {
            this.flashMessagesService.show('Please fill in all fields.', {
                cssClass: 'alert-danger',
                timeout: 2000
            });
            return false;
        }

        console.log(this.postFormGroup);

        this.buildPostModel();

        // this.blogService.submitPost(post).subscribe(res => {
        //     this.flashMessagesService.show('Post successfully submitted.', {
        //         cssClass: 'alert-success',
        //         timeout: 2000
        //     });

        //     this.redirectTo('/editor');
        // });
    }

    buildPostModel() {
        console.log(this.postFormGroup);

        let post = new Post();     
        for(var field in this.postFormGroup.value) {
            console.log(field, this.projectFormGroup);
            console.log(this.projectFormGroup.get(field));
        }

        console.log(post);
    }

    submitProject() { }
    submitTopic() { }
}
