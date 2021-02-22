import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ObfuscationService {
    constructor() { }

    constructEmail(name: string, domain: string, extension: string = 'com'): string {
        return `${name}@${domain}.${extension}`;
    }
}
