import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '@ui/core/auth';
import { Id } from '@ui/core/models/model';
import {
    NotificationService,
    ValidationService,
    SeoService, TrackingService
} from '@ui/core/services';

import { BlogPost, BlogTopic, BlogPostStatus, BlogAuthor } from '../../models';
import { BlogApiService, BlogEditorService, BlogComparisonService } from '../../services';

@Component({
    selector: 'ui-blog-post-editor',
    templateUrl: './blog-post-editor.component.html'
})
export class BlogPostEditorComponent implements OnDestroy, OnInit {
    postData: BlogPost;
    authorData: BlogAuthor[] = [];
    statusData: BlogPostStatus[] = [];
    topicData: BlogTopic[] = [];

    postForm: FormGroup;

    isLoaded: boolean = false;

    constructor(
        private authService: AuthService,
        private blogApiService: BlogApiService,
        private blogEditorService: BlogEditorService,
        private blogComparisonService: BlogComparisonService,
        private notificationService: NotificationService,
        private seoService: SeoService,
        private titleService: Title,
        public trackingService: TrackingService,
        private validationService: ValidationService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnDestroy(): void {
        this.blogEditorService.setPost(null);
    }

    ngOnInit(): void {
        this.titleService.setTitle('Blog Post Editor | Matthew Maxwell');

        this.checkForAdmin();

        this.setPageHideEvent();

        this.initPostForm();
    }

    private checkForAdmin(): void {
        if(!this.authService.isLoggedIn())
            this.router.navigate(['']);
    }

    private setPageHideEvent(): void {
        window.onpagehide = () => {
            this.blogEditorService.setPost(null);
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
        this.postData = this.blogEditorService.getPost();
    }

    private loadAuthorData(): void {
        this.blogApiService.getBlogAuthors().subscribe((res: BlogAuthor[]) => {
            this.authorData = res;
        });
    }

    private loadStatusData(): void {
        this.blogApiService.getPostStatuses().subscribe((res: BlogPostStatus[]) => {
            this.statusData = res;
        })
    }

    private loadTopicData(): void {
        this.blogApiService.getTopics().subscribe((res: BlogTopic[]) => {
            this.topicData = res.sort(this.blogComparisonService.topics);

            if(this.postData) {
                this.setTopicControls(this.postData.topics.map(t => t.id));
            } else {
                this.setTopicControls([]);
            }

            this.isLoaded = true;
        });
    }

    private setTopicControls(associatedTopicIds: Id[]): void {
        this.topicData.forEach(t => {
            const control: FormControl = this.formBuilder.control(associatedTopicIds.includes(t.id));
            (this.postForm.controls.topics as FormArray).push(control);
        });
    }

    private buildPostForm(): void {
        if(this.postData) {
            this.postForm = this.formBuilder.group({
                title:      this.formBuilder.control(this.postData.title,                        [Validators.required]),
                subtitle:   this.formBuilder.control(this.postData.subtitle,                     [Validators.required]),
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
                subtitle:   this.formBuilder.control('',                [Validators.required]),
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
            this.blogApiService.createPost(post).subscribe((res: BlogPost) => {
                this.notificationService.createNotification('Successfully created new post!');
                this.router.navigate([`blog/posts/${this.seoService.getCanonicalUrl(res.id, res.title)}`]);
            });
        } else {
            this.blogApiService.updatePost(post).subscribe((res: BlogPost) => {
                this.notificationService.createNotification('Successfully updated existing post!');
                this.router.navigate([`blog/posts/${this.seoService.getCanonicalUrl(res.id, res.title)}`]);
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
