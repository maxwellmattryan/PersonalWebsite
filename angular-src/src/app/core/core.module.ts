import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    AuthService,
    BlogService,
    NotificationService,
    ProfileService,
    ValidationService
} from './services';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        AuthService,
        BlogService,
        NotificationService,
        ProfileService,
        ValidationService
    ]
})
export class CoreModule { }