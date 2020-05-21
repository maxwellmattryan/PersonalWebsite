import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor() { }

    validateCredentials(admin) {
        if (admin.username == undefined || admin.password == undefined) {
            return false;
        } else {
            return true;
        }
    }
}
