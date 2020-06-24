import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '@app/core/http/api.service';
import { AuthService } from '@app/core/authentication';
import { BlogService, EditorService, NotificationService } from '@app/core/services';
import { Blog } from '@app/shared/interfaces';
import { Topic, Post } from '@app/shared/models';

@Component({
    selector: 'app-blog-view',
    templateUrl: './blog-view.component.html',
    styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {
    isAdmin: boolean = false;
    isLoaded: boolean = false;

    blog: Blog;
    posts: Array<Post>;
    topics: Map<string, boolean>;
    
    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private blogService: BlogService,
        private editorService: EditorService,
        private notificationService: NotificationService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.isLoggedIn();
        
        this.apiService.getBlog().subscribe((blog: Blog) => {
            this.isLoaded = true;
            this.blog = blog;
            
            this.posts = this.getPosts(this.blogService.getActiveTopic());
        });
    }

    getPosts(topic: string): Array<Post> {
        this.blogService.setActiveTopic(topic);
        this.updateTopicMap();

        return this.blog.posts.filter((value, index, array) => {
            if(value.topics.map(t => t.name).includes(topic) || topic === 'All') return value;
        });
    }

    updateTopicMap(): void {
        let topics = this.getEmptyTopicMap();
        topics.set(this.blogService.getActiveTopic(), true);

        this.topics = topics;
    }

    getEmptyTopicMap(): Map<string, boolean> {
        let topics = new Map<string, boolean>();
        topics.set("All", false);

        this.blog.posts.forEach((post, pIdx) => {
            post.topics.forEach((topic, tIdx) => {
                topics.set(topic.name, false);
            });
        });

        return topics;
    }

    getTopicArray(): Array<any> {
        return Array.from(this.topics.keys()).map(t => [t, this.topics.get(t)]).sort();
    }

    trackByIndex(index, item): void {
        return index;
    }

    sendTopicToEditor(topic: string): void {
        this.editorService.setTopic(this.blog.topics.find(t => t.name === topic));
    }

    deleteTopic(topic: string): void {
        this.topics.delete(topic);

        const requestURL = '/blog/topics/' + this.blog.topics.find(t => t.name === topic).uri;
        this.apiService.deletePost(requestURL, this.authService.getAuthHeaders()).subscribe((res: any) => {
            this.notificationService.createNotification(res.msg); 
        });
    }
}