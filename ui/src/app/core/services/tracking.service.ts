import { Injectable } from '@angular/core';
import { BlogAuthor } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class TrackingService {
    constructor() { }

    // CAUTION: Only use when there is guaranteed to be an "id" property
    objectById<T>(index: number, obj: T): number {
        return obj['id'];
    }
}