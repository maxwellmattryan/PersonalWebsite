import { Injectable } from '@angular/core';
import { AdminComponent } from '../components/admin/admin.component';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor() { }

    isValidCredentials(admin) {
        return (
            admin.username != undefined && 
            admin.password != undefined
        );
    }

    isValidPost(post) {
        return (
            post.title != undefined && 
            post.subtitle != undefined && 
            post.author != undefined && 
            post.content != undefined
        );
    }
}
