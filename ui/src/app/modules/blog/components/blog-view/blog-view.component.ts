import { Component, OnInit } from '@angular/core';

import { BlogPost, BlogTopic } from '@app/shared/models';
import { ApiService } from '@app/core/http/api.service';
import { AuthService } from '@app/core/authentication';
import { BlogService, EditorService, NotificationService } from '@app/core/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-blog-view',
    templateUrl: './blog-view.component.html',
    styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {
    isAdmin: boolean = false;
    isLoaded: boolean = false;

    posts: BlogPost[];
    topics: BlogTopic[];

    activeTopicId: number = -1;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private blogService: BlogService,
        private editorService: EditorService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();

        this.apiService.getPosts(this.activeTopicId).subscribe((res: BlogPost[]) => {
            this.posts = res;
            this.topics = this.getTopicsFromPosts();

            this.isLoaded = true;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    private getTopicsFromPosts(): BlogTopic[] {
        const set = new Set<BlogTopic>();

        this.posts.forEach(p => {
            p.topics.forEach(t => {
                set.add(t);
            });
        });

        return [...set];
    }

    setActiveTopic(topic: BlogTopic) {
        console.log('MAKE REQUEST TO API AND GET THESE TOPICS');

        this.blogService.setActiveTopic(topic);
    }

    filterPosts(topicId: number): void {
        this.activeTopicId = topicId;

        this.apiService.getPosts(topicId).subscribe((res: BlogPost[]) => {
            this.posts = res;
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    sendTopicToEditor(topic: BlogTopic): void {
        this.editorService.setTopic(topic);
    }

    deleteTopic(topic: string): void {
        if(!this.canDeleteTopic(topic)) {
            this.notificationService.createNotification('Unable to delete topic (fix single-topic posts).');
        } else {
            const requestURL = '/blog/topics/' + this.blog.topics.find(t => t.name === topic).uri;

            this.apiService.deletePost(requestURL).subscribe((res: any) => {
                this.notificationService.createNotification(res.msg);

                if(this.topics.get(topic)) {
                    this.filterPosts('All');
                }

                this.topics.delete(topic);
            });
        }
    }

    canDeleteTopic(topic: string): boolean {
        let posts = this.blog.posts.filter(p => p.topics.map(t => t.name).includes(topic));
        posts = posts.filter(p => p.topics.length === 1);

        return posts.length === 0;
    }
}
