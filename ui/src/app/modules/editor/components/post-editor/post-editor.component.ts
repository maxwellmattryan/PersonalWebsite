import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Post, Topic } from '@app/shared/models';
import { AuthService } from '@app/core/authentication';
import { ApiService } from '@app/core/http';
import { EditorService, NotificationService, ValidationService, ComparisonService } from '@app/core/services';

@Component({
    selector: 'app-post-editor',
    templateUrl: './post-editor.component.html',
    styleUrls: ['../../editor.component.scss']
})
export class PostEditorComponent implements OnDestroy, OnInit {
    postData: Post;
    postForm: FormGroup;

    topics: Array<Topic> = [];

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private comparisonService: ComparisonService,
        private editorService: EditorService,
        private notificationService: NotificationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private validationService: ValidationService
    ) { }

    ngOnDestroy(): void {
        this.editorService.setPost(null);
    }

    ngOnInit(): void {
        this.checkForAdmin();

        this.setUnloadEvent();

        this.loadPostData();
        this.buildPostForm();
        this.loadTopicData();
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

    loadPostData(): void {
        this.postData = this.editorService.getPost();
    }

    buildPostForm(): void {
        if(this.postData) {
            this.postForm = this.formBuilder.group({
                title:          this.formBuilder.control(this.postData.title,           [Validators.required]                   ),
                subtitle:       this.formBuilder.control(this.postData.subtitle,        [Validators.required]                   ),
                topics:         this.formBuilder.array  ([],                            this.validationService.hasMinElements(1)  ),
                author:         this.formBuilder.control(this.postData.author,          [Validators.required]                   ),
                description:    this.formBuilder.control(this.postData.description,     [Validators.required]                   ),
                content:        this.formBuilder.control(this.postData.content,         [Validators.required]                   ),
                imageURL:       this.formBuilder.control(this.postData.imageURL,        [Validators.required]                   )
            });
        } else {
            this.postForm = this.formBuilder.group({
                title:          this.formBuilder.control('', [Validators.required]                  ),
                subtitle:       this.formBuilder.control('', [Validators.required]                  ),
                topics:         this.formBuilder.array  ([], this.validationService.hasMinElements(1) ),
                author:         this.formBuilder.control('', [Validators.required]                  ),
                description:    this.formBuilder.control('', [Validators.required]                  ),
                content:        this.formBuilder.control('', [Validators.required]                  ),
                imageURL:       this.formBuilder.control('', [Validators.required]                  )
            });
        }
    }

    loadTopicData(): void {
        this.apiService.getTopics().subscribe(topics => {
            this.topics = topics.sort(this.comparisonService.topics);

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

        this.apiService.putPost(post).subscribe((res: any) => {
            this.notificationService.createNotification(res.msg);

            if(res.success) {
                this.router.navigate(['blog/posts/' + post['uri']]);
            }
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
}
