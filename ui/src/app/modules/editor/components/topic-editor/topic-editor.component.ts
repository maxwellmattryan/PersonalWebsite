import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Topic } from '@app/shared/models';
import { ApiService } from '@app/core/http';
import { AuthService } from '@app/core/authentication';
import { EditorService, NotificationService } from '@app/core/services';

@Component({
    selector: 'app-topic-editor',
    templateUrl: './topic-editor.component.html',
    styleUrls: ['../../editor.component.scss']
})
export class TopicEditorComponent implements OnInit, OnDestroy {
    topicData: Topic;
    topicForm: FormGroup;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private editorService: EditorService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.checkForAdmin();

        this.setUnloadEvent();

        this.loadTopicData();
        this.buildTopicForm();
    }

    ngOnDestroy(): void {
        this.editorService.setTopic(null);
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

    loadTopicData(): void {
        this.topicData = this.editorService.getTopic();
    }

    buildTopicForm(): void {
        if(this.topicData) {
            this.topicForm = this.formBuilder.group({
                name:           this.formBuilder.control(this.topicData.name,           [Validators.required]),
                description:    this.formBuilder.control(this.topicData.description,    [Validators.required]),
                imageURL:       this.formBuilder.control(this.topicData.imageURL,       [Validators.required])
            });
        } else {
            this.topicForm = this.formBuilder.group({
                name:           this.formBuilder.control('', [Validators.required]),
                description:    this.formBuilder.control('', [Validators.required]),
                imageURL:       this.formBuilder.control('', [Validators.required])
            });
        }
    }

    onSubmit(): void {
        const topic = this.buildTopicData();

        this.apiService.putTopic(topic).subscribe((res: any) => {
            this.notificationService.createNotification(res.msg);

            if(res.success) {
                this.router.navigate(['blog/']);
            }
        });
    }

    buildTopicData(): any {
        let topic = {};
        for(let key in this.topicForm.value) {
            topic[key] = this.topicForm.value[key];
        }

        return topic;
    }

    getTopicID(): string {
        return this.topicData ? this.topicData._id : '';
    }

    getTopicURI(name: string): string {
        return name.toLowerCase().replace(/[ ]/g, '-').replace(/[\.?]/g, '');
    }
}
