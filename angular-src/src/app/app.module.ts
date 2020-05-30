import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AdminComponent } from './components/admin/admin.component';
import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { EditorComponent } from './components/editor/editor.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { RegisterComponent } from './components/register/register.component';
import { TopicComponent } from './components/topic/topic.component';

import { AuthService } from './services/auth.service';
import { ValidationService } from './services/validation.service';

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
