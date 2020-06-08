import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

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

import { AuthService, ValidationService } from './services';
import { SidebarComponent } from './components/sidebar/sidebar.component';

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
        ReactiveFormsModule
    ],
    providers: [
        AuthService,
        ValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
