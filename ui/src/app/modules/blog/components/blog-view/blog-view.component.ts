import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { AuthService } from '@ui/core/auth';
import {
    NotificationService,
    TrackingService
} from '@ui/core/services';
import { PortfolioProfileService } from '@ui/modules/portfolio/services';

import { BlogPost, BlogTopic } from '../../models';
import {
    BlogApiService,
    BlogComparisonService,
    BlogEditorService,
    BlogTopicService
} from '../../services';

@Component({
    selector: 'ui-blog-view',
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
        private authService: AuthService,
        private blogApiService: BlogApiService,
        private blogComparisonService: BlogComparisonService,
        private blogEditorService: BlogEditorService,
        public blogTopicService: BlogTopicService,
        private notificationService: NotificationService,
        private portfolioProfileService: PortfolioProfileService,
        private titleService: Title,
        public trackingService: TrackingService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle(`${this.portfolioProfileService.getActiveProfileName()} Blog | Matthew Maxwell`);

        this.isAdmin = this.authService.isLoggedIn();

        this.blogApiService.getPosts(this.activeTopicId, !this.isAdmin).subscribe((res: BlogPost[]) => {
            this.posts = res;
            this.topics = this.getTopicsFromPosts().sort(this.blogComparisonService.topics);

            if(this.blogTopicService.hasActiveTopic()) {
                this.filterPosts(this.blogTopicService.getActiveTopicId());
                this.blogTopicService.setActiveTopic(null);
            }

            this.isLoaded = true;
        });
    }

    private getTopicsFromPosts(): BlogTopic[] {
        let result: BlogTopic[] = [];

        this.posts.forEach(p => {
            p.topics.forEach(t => {
                if(!result.map(bt => bt.id).includes(t.id)) result.push(t);
            });
        });

        return result;
    }

    filterPosts(topicId: number): void {
        if(this.isAdmin) {
            this.blogApiService.getPosts(topicId, false).subscribe((res: BlogPost[]) => {
                this.posts = res;
                this.activeTopicId = topicId;
            });
        } else {
            this.blogApiService.getPosts(topicId).subscribe((res: BlogPost[]) => {
                this.posts = res;
                this.activeTopicId = topicId;
            }, (error: HttpErrorResponse) => {
                this.notificationService.createNotification(error.error.message);
            });
        }
    }

    sendTopicToEditor(topic: BlogTopic): void {
        this.blogEditorService.setTopic(topic);
    }

    deleteTopic(topic: BlogTopic): void {
        if(!this.notificationService.deleteConfirmation('blog topic')) return;

        this.blogApiService.deleteTopic(topic.id).subscribe((res: any) => {
            this.removeTopic(topic.id);
            this.notificationService.createNotification('Successfully deleted blog topic!');
            this.filterPosts(-1);
        }, (error: HttpErrorResponse) => {
            this.notificationService.createNotification(error.error.message);
        });
    }

    private removeTopic(id: number): void {
        this.topics = this.topics.filter(t => t.id != id);

        this.posts = this.posts.filter(p => !p.topics.map(t => t.id).includes(id));
    }
}
