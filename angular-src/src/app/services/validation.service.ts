import { Injectable } from '@angular/core';

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
            post.title              != undefined && 
            post.subtitle           != undefined &&  
            post.topics.length      != 0 &&  
            post.author             != undefined && 
            post.content            != undefined &&
            post.imageUrls.length   != 0
        );
    }
}
