import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
    constructor(
        private notificationService: NotificationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({ withCredentials: true });

        return next.handle(req).pipe(catchError(err => this.handleHttpError(err)));
    }

    private handleHttpError(error: HttpErrorResponse): Observable<any> {
        switch(error.status) {
            case 400:
            case 404:
                this.notificationService.createNotification(error.error.message);
                break;
            default:
                this.notificationService.createNotification(error.message);
                break;
        }

        return throwError(error);
    }
}