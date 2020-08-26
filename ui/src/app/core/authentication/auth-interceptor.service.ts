import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { NotificationService } from '../services/notification/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({ withCredentials: true });

        return next.handle(req).pipe(catchError(err => this.handleAuthError(err)));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if(err.status === 401 || err.status === 403) {
            this.authService.logoutAdmin();
            this.notificationService.createNotification('Unauthorized request. Please log in.');

            this.router.navigate(['/admin/login']);

            return of(err.message);
        } else {
            return throwError(err);
        }
    }
}
