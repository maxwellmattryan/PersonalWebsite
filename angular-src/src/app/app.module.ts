import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
    AdminModule,
    BlogModule,
    EditorModule,
    MaterialModule,
    NavigationModule,
    SharedModule
} from './modules';

import {
    AuthService, 
    BlogService,
    NotificationService,
    ProfileService,
    ValidationService
} from './services';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        AdminModule,
        BrowserAnimationsModule,
        BrowserModule,
        EditorModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        NavigationModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [
        AuthService,
        BlogService,
        NotificationService,
        ProfileService,
        ValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
