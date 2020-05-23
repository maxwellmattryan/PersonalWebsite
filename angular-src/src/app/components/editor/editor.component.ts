import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from '../../services/validation.service';

import { Topic } from '../../models/topic.model';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    title: string;
    subtitle: string;
    author: string;
    description: string;
    content: string;
    imageUrls: string;

    topics: Array<object>;

    constructor(
        private router: Router,
        private authService: AuthService,
        private validationService: ValidationService,
        private flashMessagesService: FlashMessagesService
    ) { }

    ngOnInit(): void {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/']);
        } else {
            this.authService.getTopics().subscribe(res => {
                this.topics = res.topics.map(t => ({
                    _id: t._id, 
                    name: t.name, 
                    isSelected: false 
                }));
            });
        }
    }

    redirectTo(uri: string){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate([uri]));
     }

    onEditorSubmit(): void {
        this.submitPost();
    }

    submitPost() {
        const selectedTopics = this.topics.filter((topic: any) => topic.isSelected).map((topic: any) => topic._id);

        const post: object = {
            title: this.title,
            subtitle: this.subtitle,
            topics: selectedTopics,
            author: this.author,
            description: this.description,
            content: this.content,
            // TODO: handle the input parsing better because ','.split(',') will return ["", ""]
            imageUrls: this.imageUrls ? this.imageUrls.split(',').map(url => url.trim()) : []
        };

        if (!this.validationService.isValidPost(post)) {
            this.flashMessagesService.show('Please fill in all fields.', {
                cssClass: 'alert-danger',
                timeout: 2000
            });
            return false;
        }

        this.authService.submitPost(post).subscribe(res => {
            this.flashMessagesService.show('Post successfully submitted.', {
                cssClass: 'alert-success',
                timeout: 2000
            });
           
            this.redirectTo('/editor');
        });
    }

    submitProject() { }
    submitTopic() { }
}
