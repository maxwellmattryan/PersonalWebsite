import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    constructor() { }

    getCanonicalUrl(id: number, name: string): string {
        return `${id}/${this.formatUri(name)}`;
    }

    formatUri(raw: string): string {
        return raw.toLowerCase().replace(/[ ]/g, '-').replace(/[\.?]/g, '');
    }

    // CAUTION: Be careful using when there are multiple ids in the url string (will return the first one)
    getIdFromUrl(url: string): number {
        const idString = url.split('/').find(n => !Number.isNaN(parseInt(n)));

        return parseInt(idString);
    }
}
