import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApiService } from './http/api.service';
import { AuthService } from './authentication/auth.service';
import {
    BlogService,
    EditorService,
    NotificationService,
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
        EditorService,
        NotificationService,
        ValidationService
    ]
})
export class CoreModule { }