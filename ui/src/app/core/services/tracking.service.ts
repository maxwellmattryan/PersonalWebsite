import { Injectable } from '@angular/core';

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