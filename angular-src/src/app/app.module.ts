import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FlashMessagesModule } from 'angular2-flash-messages';

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
        TopicComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FlashMessagesModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        ValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
