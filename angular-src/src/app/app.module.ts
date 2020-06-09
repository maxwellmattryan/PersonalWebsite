import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';

import {
    AdminComponent,
    BlogComponent,
    EditorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    PostComponent,
    RegisterComponent,
    TopicComponent
} from './components';

import { AuthService, BlogService, ValidationService } from './services';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AdminComponent,
        AppComponent,
        BlogComponent,
        EditorComponent,
        HomeComponent,
        LoginComponent,
        NavbarComponent,
        RegisterComponent,
        PostComponent,
        TopicComponent,
        SidebarComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FlashMessagesModule.forRoot(),
        FormsModule,
        HttpClientModule,
        MarkdownModule.forRoot(),
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatToolbarModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
    providers: [
        AuthService,
        BlogService,
        ValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
