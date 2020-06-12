import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Post, Topic } from '@app/shared/models';
import { AuthService } from '@app/core/authentication';
import { ApiService } from '@app/core/http';
import { EditorService, NotificationService, ValidationService } from '@app/core/services';

@Component({
    selector: 'app-post-editor',
    templateUrl: './post-editor.component.html',
    styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit, OnDestroy {
    postData: Post;
    postForm: FormGroup;

    topics: Array<Topic> = [];

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private editorService: EditorService,
        private notificationService: NotificationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private validationService: ValidationService
    ) { }

    ngOnInit(): void {
        this.checkForAdmin();
        
        this.setUnloadEvent();

        this.buildPostForm();
    }

    ngOnDestroy(): void {
        this.editorService.setPost(null);
    }

    checkForAdmin(): void {
        if(!this.authService.isLoggedIn())
            this.router.navigate(['/']);
    }

    setUnloadEvent(): void {
        window.onbeforeunload = () => {
            this.editorService.setPost(null);
        };
    }

    buildPostForm(): void {
        this.loadPostData();

        if(this.postData) {
            this.postForm = this.formBuilder.group({
                title:          this.formBuilder.control(this.postData.title,           [Validators.required]),
                subtitle:       this.formBuilder.control(this.postData.subtitle,        [Validators.required]),
                topics:         this.formBuilder.array([],                              this.validationService.hasMinTopics(1)),
                author:         this.formBuilder.control(this.postData.author,          [Validators.required]),
                description:    this.formBuilder.control(this.postData.description,     [Validators.required]),
                content:        this.formBuilder.control(this.postData.content,         [Validators.required]),
                imageURL:       this.formBuilder.control(this.postData.imageURL,        [Validators.required])
            });
        } else {
            this.postForm = this.formBuilder.group({
                title:          this.formBuilder.control('',    [Validators.required]),
                subtitle:       this.formBuilder.control('',    [Validators.required]),
                topics:         this.formBuilder.array([],      this.validationService.hasMinTopics(1)),
                author:         this.formBuilder.control('',    [Validators.required]),
                description:    this.formBuilder.control('',    [Validators.required]),
                content:        this.formBuilder.control('',    [Validators.required]),
                imageURL:       this.formBuilder.control('',    [Validators.required])
            });
        }
        
        this.loadTopicData();
    }

    loadPostData(): void {
        this.postData = this.editorService.getPost();
    }

    loadTopicData(): void {
        this.apiService.getTopics().subscribe(topics => {
            this.topics = topics;

            this.topics.forEach((topic, idx) => {
                let control: FormControl;

                if(this.postData && this.postData.topics.map(t => t.name).includes(topic.name)) {
                    control = this.formBuilder.control(true);
                } else {
                    control = this.formBuilder.control(false);
                }

                (this.postForm.controls.topics as FormArray).push(control);
            });
        });
    }

    onSubmit(): void {
        const post = this.buildPostData();
        const headers = this.getHeaders();

        this.apiService.putPost(post, headers).subscribe(res => {
            let message: string;

            if(!this.postData) {
                message = 'Successfully created blog post!';
            } else {
                message = 'Successfully updated blog post!'
            }

            this.notificationService.createNotification(message);
            this.router.navigate(['blog/posts/' + post['uri']]);
        });
    }

    buildPostData(): any {
        let post = {};
        for(let key in this.postForm.value) {
            if(key === 'topics') {
                post[key] = this.getSelectedTopics();
            } else {
                post[key] = this.postForm.value[key];
            } 
        }
        post['_id'] = this.getPostID();
        post['uri'] = this.getPostURI(post['title']);

        return post;
    }

    getSelectedTopics(): any {
        return this.postForm.value.topics
            .map((topic, idx) => topic ? this.topics[idx]._id : null)
            .filter(topic => topic !== null);
    }

    getPostID(): string {
        return this.postData ? this.postData._id : '';
    }

    getPostURI(title: string): string {
        return title.toLowerCase().replace(/[ ]/g, '-').replace(/[\.?]/g, '');
    }

    getHeaders(): HttpHeaders {
        let headers = this.authService.getAuthHeaders();
        headers.set('Content-Type', 'application/json');

        return headers;
    }
}