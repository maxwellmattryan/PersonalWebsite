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
        return raw.toLowerCase().replace(/[ &+=]/g, '-').replace(/[\.\(\)\[\]\@\#\?\:]/g, '');
    }

    getFormattedDate(raw: Date): string {
        const date = new Date(raw);

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const nth = (day) => {
            if(day > 3 && day < 21) return 'th';

            switch(day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return months[date.getMonth()] + ' ' + date.getDate() + '<sup>' + nth(date.getDate()) + '</sup>, ' + date.getFullYear();
    }

    // CAUTION: Be careful using when there are multiple ids in the url string (will return the first one)
    getIdFromUrl(url: string): number {
        const idString = url.split('/').find(n => !Number.isNaN(parseInt(n)));

        return parseInt(idString);
    }
}
