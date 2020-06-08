import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { Post, Topic } from 'src/app/models';

import { AuthService, BlogService, EditorService, ValidationService } from '../../services';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnDestroy, OnInit {
    postData: Post;
    postForm: FormGroup;

    topics: Array<Topic> = [];

    constructor(
        private authService: AuthService,
        private blogService: BlogService,
        private editorService: EditorService,
        private flashMessagesService: FlashMessagesService,
        private formBuilder: FormBuilder,
        private router: Router,
        private validationService: ValidationService
    ) { }

    ngOnDestroy(): void {
        this.editorService.setPostData(null);
    }

    ngOnInit(): void {
        this.checkForAdmin();
        
        this.setUnloadEvent();

        this.loadPostData();
        this.loadTopicData();
        
        this.buildPostForm();
    }

    checkForAdmin(): void {
        if(!this.authService.isLoggedIn())
            this.router.navigate(['/']);
    }

    setUnloadEvent(): void {
        window.onbeforeunload = () => {
            this.editorService.setPostData(null);
        };
    }

    loadPostData(): void {
        this.postData = this.editorService.getPostData();
    }

    loadTopicData(): void {
        this.blogService.getTopics().subscribe(topics => {
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

    buildPostForm(): void {
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
    }

    onSubmit(): void {
        const post = this.buildPostData();
        const headers = this.getHeaders();

        this.blogService.putPost(post, headers).subscribe(res => {
            if(!this.postData) {
                this.flashMessagesService.show('Successfully created blog post.', {
                    cssClass: 'alert-success',
                    timeout: 2000
                });
            } else {
                this.flashMessagesService.show('Successfully updated blog post.', {
                    cssClass: 'alert-success',
                    timeout: 2000
                });
            }
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