import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BlogTopic } from '@app/shared/models';
import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/authentication';
import { EditorService, NotificationService } from '@app/core/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-topic-editor',
    templateUrl: './topic-editor.component.html',
    styleUrls: ['../../editor.component.scss']
})
export class TopicEditorComponent implements OnInit, OnDestroy {
    topicData: BlogTopic;
    topicForm: FormGroup;

    @Input() id: number;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private editorService: EditorService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private router: Router,
    ) { }

    ngOnDestroy(): void {
        this.editorService.setTopic(null);
    }

    ngOnInit(): void {
        this.checkForAdmin();

        this.setUnloadEvent();

        this.initTopicForm();
    }

    private checkForAdmin(): void {
        if(!this.authService.isLoggedIn())
            this.router.navigate(['/']);
    }

    private setUnloadEvent(): void {
        window.onbeforeunload = () => {
            this.editorService.setPost(null);
        };
    }

    private initTopicForm(): void {
        this.loadTopicData();

        this.buildTopicForm();
    }

    private loadTopicData(): void {
        this.topicData = this.editorService.getTopic();
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
            this.apiService.createTopic(topic).subscribe((res: BlogTopic) => {
                this.notificationService.createNotification('Created new topic.');
                this.router.navigate(['blog'])
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        } else {
            this.apiService.updateTopic(topic).subscribe((res: BlogTopic) => {
                this.notificationService.createNotification('Updated existing topic.');
                this.router.navigate(['blog'])
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
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
