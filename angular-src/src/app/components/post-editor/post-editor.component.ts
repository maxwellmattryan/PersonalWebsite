import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from '../../services/validation.service';

@Component({
    selector: 'app-post-editor',
    templateUrl: './post-editor.component.html',
    styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {
    title: String;
    subtitle: String;
    author: String;
    content: String;

    constructor(
        private router: Router,
        private authService: AuthService,
        private validationService: ValidationService,
        private flashMessagesService: FlashMessagesService
    ) { }

    ngOnInit(): void {
        if(!this.authService.isAdmin()) {
            this.router.navigate(['/blog']);
        }
    }

    onPostSubmit() {
        const post = {
            title: this.title,
            subtitle: this.subtitle,
            author: this.author,
            content: this.content
        };

        if (!this.validationService.isValidPost(post)) {
            this.flashMessagesService.show('Please fill in all fields !', {
                cssClass: 'alert-danger',
                timeout: 2000
            });
            return false;
        }

        this.authService.createPost(post).subscribe(res => {
            console.log(res);
        }, err => {
            console.log(err);
            return false;
        });
    }
}
