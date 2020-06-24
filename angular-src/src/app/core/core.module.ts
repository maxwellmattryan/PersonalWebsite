import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApiService } from './http/api.service';
import { AuthService } from './authentication/auth.service';
import {
    BlogService,
    ComparisonService,
    EditorService,
    NotificationService,
    ProfileService,
    ValidationService
} from './services';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ApiService,
        AuthService,
        BlogService,
        ComparisonService,
        EditorService,
        NotificationService,
        ProfileService,
        ValidationService
    ]
})
export class CoreModule { }