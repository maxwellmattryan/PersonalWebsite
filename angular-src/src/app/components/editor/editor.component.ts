import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
        private formBuilder: FormBuilder,
        private router: Router,
        private validationService: ValidationService
    ) { }

    ngOnDestroy(): void {
        this.editorService.setPostData(null);
    }

    ngOnInit(): void {
        window.onbeforeunload = (e) => {
            this.editorService.setPostData(null);
        };

        this.postData = this.editorService.getPostData();
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

    onSubmit() {
        const selectedTopics = this.postForm.value.topics
            .map((topic, idx) => topic ? this.topics[idx]._id : null)
            .filter(topic => topic !== null);

        let post = {};
        for(let key in this.postForm.value) {
            if(key === "topics") post[key] = selectedTopics;
            else post[key] = this.postForm.value[key];
        }
        post['uri'] = post['title'].toLowerCase().replace(' ', '-');

        this.blogService.submitPost(post, this.authService.getAuthHeaders()).subscribe(res => {
            this.router.navigate(['blog/posts/' + post['uri']]);
        });
    }
}
