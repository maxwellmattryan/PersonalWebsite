import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '@ui/core/auth';
import { NotificationService } from '@ui/core/services';

import { BlogTopic } from '../../models';
import { BlogApiService, BlogEditorService } from '../../services';

@Component({
    selector: 'ui-blog-topic-editor',
    templateUrl: './blog-topic-editor.component.html'
})
export class BlogTopicEditorComponent implements OnInit, OnDestroy {
    topicData: BlogTopic;
    topicForm: FormGroup;

    isLoaded: boolean = false;

    constructor(
        private authService: AuthService,
        private blogApiService: BlogApiService,
        private blogEditorService: BlogEditorService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private titleService: Title,
        private router: Router,
    ) { }

    ngOnDestroy(): void {
        this.blogEditorService.setTopic(null);
    }

    ngOnInit(): void {
        this.titleService.setTitle('Blog Topic Editor | Matthew Maxwell');

        this.checkForAdmin();

        this.setPageHideEvent();

        this.initTopicForm();
    }

    private checkForAdmin(): void {
        if(!this.authService.isLoggedIn())
            this.router.navigate(['']);
    }

    private setPageHideEvent(): void {
        window.onpagehide = () => {
            this.blogEditorService.setTopic(null);
        };
    }

    private initTopicForm(): void {
        this.loadTopicData();

        this.buildTopicForm();
    }

    private loadTopicData(): void {
        this.topicData = this.blogEditorService.getTopic();
        this.isLoaded = true;
    }

    private buildTopicForm(): void {
        if(this.topicData) {
            this.topicForm = this.formBuilder.group({
                name:        this.formBuilder.control(this.topicData.name,        [Validators.required]),
                description: this.formBuilder.control(this.topicData.description, [Validators.required]),
            });
        } else {
            this.topicForm = this.formBuilder.group({
                name:        this.formBuilder.control('', [Validators.required]),
                description: this.formBuilder.control('', [Validators.required]),
            });
        }
    }

    onSubmit(): void {
        const topic = this.buildFormTopicData();

        if(topic.id === undefined) {
            this.blogApiService.createTopic(topic).subscribe((res: BlogTopic) => {
                this.notificationService.createNotification('Successfully created new topic.');
                this.router.navigate(['blog'])
            });
        } else {
            this.blogApiService.updateTopic(topic).subscribe((res: BlogTopic) => {
                this.notificationService.createNotification('Successfully updated existing topic.');
                this.router.navigate(['blog'])
            });
        }
    }

    buildFormTopicData(): BlogTopic {
        return new BlogTopic({
            ...this.topicForm.value,
            id: this.topicData ? this.topicData.id : undefined
        });
    }
}
