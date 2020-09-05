import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BlogPost, BlogTopic, BlogPostStatus, BlogAuthor } from '@app/shared/models';
import { AuthService } from '@app/core/authentication';
import { ApiService } from '@app/core/http';
import {
    EditorService,
    NotificationService,
    ValidationService,
    ComparisonService,
    SeoService
} from '@app/core/services';

@Component({
    selector: 'app-post-editor',
    templateUrl: './post-editor.component.html',
    styleUrls: ['../../editor.component.scss']
})
export class PostEditorComponent implements OnDestroy, OnInit {
    postData: BlogPost;
    authorData: BlogAuthor[] = [];
    statusData: BlogPostStatus[] = [];
    topicData: BlogTopic[] = [];

    postForm: FormGroup;

    @Input() id: number;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private comparisonService: ComparisonService,
        private editorService: EditorService,
        private notificationService: NotificationService,
        private seoService: SeoService,
        private validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnDestroy(): void {
        this.editorService.setPost(null);
    }

    ngOnInit(): void {
        this.checkForAdmin();

        this.setUnloadEvent();

        this.initPostForm();
    }

    private checkForAdmin(): void {
        if(!this.authService.isLoggedIn())
            this.router.navigate(['']);
    }

    private setUnloadEvent(): void {
        window.onbeforeunload = () => {
            this.editorService.setPost(null);
        };
    }

    private initPostForm(): void {
        this.loadPostData();
        this.loadAuthorData();
        this.loadStatusData();
        this.loadTopicData();

        this.buildPostForm();
    }

    private loadPostData(): void {
        this.postData = this.editorService.getPost();
    }

    private loadAuthorData(): void {
        this.apiService.getBlogAuthors().subscribe((res: BlogAuthor[]) => {
            this.authorData = res;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    private loadStatusData(): void {
        this.apiService.getPostStatuses().subscribe((res: BlogPostStatus[]) => {
            this.statusData = res;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        })
    }

    private loadTopicData(): void {
        this.apiService.getTopics().subscribe((res: BlogTopic[]) => {
            this.topicData = res.sort(this.comparisonService.topics);
            if(this.postData) {
                this.setTopicControls(this.postData.topics.map(t => t.id));
            } else {
                this.setTopicControls([]);
            }
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    private setTopicControls(associatedTopicIds: number[]): void {
        this.topicData.forEach(t => {
            const control: FormControl = this.formBuilder.control(associatedTopicIds.includes(t.id));
            (this.postForm.controls.topics as FormArray).push(control);
        });
    }

    private buildPostForm(): void {
        if(this.postData) {
            this.postForm = this.formBuilder.group({
                title:      this.formBuilder.control(this.postData.title,                        [Validators.required]),
                author:     this.formBuilder.control(this.buildAuthorName(this.postData.author), [Validators.required]),
                status:     this.formBuilder.control(this.postData.status.status,                [Validators.required]),
                topics:     this.formBuilder.array  (this.topicData,                             [this.validationService.hasMinElements(1)]),
                preview:    this.formBuilder.control(this.postData.preview,                      [Validators.required]),
                content:    this.formBuilder.control(this.postData.content,                      [Validators.required]),
                image_url:  this.formBuilder.control(this.postData.image_url,                    [Validators.required])
            });
        } else {
            this.postForm = this.formBuilder.group({
                title:      this.formBuilder.control('',                [Validators.required]),
                author:     this.formBuilder.control('Matthew Maxwell', [Validators.required]),
                status:     this.formBuilder.control('DRAFT',           [Validators.required]),
                topics:     this.formBuilder.array  ([],                [this.validationService.hasMinElements(1)]),
                preview:    this.formBuilder.control('',                [Validators.required]),
                content:    this.formBuilder.control('',                [Validators.required]),
                image_url:  this.formBuilder.control('',                [Validators.required])
            });
        }
    }

    buildAuthorName(author: BlogAuthor): string {
        return `${author.first_name} ${author.last_name}`;
    }

    onSubmit(): void {
        const post = this.buildFormPostData();

        if(post.id === undefined) {
            this.apiService.createPost(post).subscribe((res: BlogPost) => {
                this.notificationService.createNotification('Successfully created new post!');
                this.router.navigate([`blog/posts/${this.seoService.getCanonicalUrl(res.id, res.title)}`]);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        } else {
            this.apiService.updatePost(post).subscribe((res: BlogPost) => {
                this.notificationService.createNotification('Successfully updated existing post!');
                this.router.navigate([`blog/posts/${this.seoService.getCanonicalUrl(res.id, res.title)}`]);
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        }
    }

    private buildFormPostData(): BlogPost {
        const author = this.buildFormAuthorData();
        const status = this.buildFormStatusData();
        const topics = this.buildFormTopicData();

        return new BlogPost({
            ...this.postForm.value,
            id: this.postData ? this.postData.id : undefined,
            author: author,
            status: status,
            topics: topics
        });
    }

    private buildFormAuthorData(): BlogAuthor {
        return this.authorData.find(a => this.buildAuthorName(a) === this.postForm.value.author);
    }

    private buildFormStatusData(): BlogPostStatus {
        return this.statusData.find(s => s.status === this.postForm.value.status);
    }

    private buildFormTopicData(): BlogTopic[] {
        return this.postForm.value.topics.map((t, idx) => {
            if(t) return this.topicData[idx];
        }).filter(t => t !== undefined);
    }
}
