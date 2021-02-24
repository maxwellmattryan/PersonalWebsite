import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ObfuscationService {
    constructor() { }

    constructEmail(name: string, domain: string, extension: string = 'com'): string {
        return `mailto:${name}-at-${domain}-dot-${extension}`;
    }

    openEmail(event: Event, name: string, domain: string, extension: string = 'com'): void {
        const mailToUrl = `mailto:${name}@${domain}.${extension}`;
        const elem: HTMLAnchorElement = (<HTMLAnchorElement>event.target);
        elem.href = mailToUrl;

        setTimeout(() => {
            elem.href = this.constructEmail(name, domain, extension);
        }, 100);
    }
}
