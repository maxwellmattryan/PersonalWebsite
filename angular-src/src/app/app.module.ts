import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';

import {
    BlogComponent,
    EditorComponent,
    HomeComponent,
    NavbarComponent,
    PostComponent,
    TopicComponent
} from './components';

import {
    AdminModule,
    MaterialModule
} from './modules';

import {
    AuthService, 
    BlogService,
    NotificationService,
    ProfileService,
    ValidationService
} from './services';

@NgModule({
    declarations: [
        AppComponent,
        BlogComponent,
        EditorComponent,
        HomeComponent,
        NavbarComponent,
        PostComponent,
        TopicComponent
    ],
    imports: [
        AdminModule,
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MarkdownModule.forRoot(),
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
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
