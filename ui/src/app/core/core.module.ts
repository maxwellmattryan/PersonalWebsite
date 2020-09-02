import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './http';
import { AuthService, AuthInterceptorService } from './authentication';
import {
    BlogService,
    ComparisonService,
    EditorService,
    NotificationService,
    ValidationService
} from './services';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: function(router: Router, authService: AuthService, notificationService: NotificationService) {
                return new AuthInterceptorService(router, authService, notificationService);
            },
            multi: true,
            deps: [Router, AuthService, NotificationService]
        },
        ApiService,
        AuthService,
        BlogService,
        ComparisonService,
        EditorService,
        NotificationService,
        ValidationService
    ]
})
export class CoreModule { }
