import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private activeTopic: string = 'All';

    constructor() { }

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

    getActiveTopic(): string {
        return this.activeTopic;
    }

    setActiveTopic(topic: string): void {
        this.activeTopic = topic;
    }
}
