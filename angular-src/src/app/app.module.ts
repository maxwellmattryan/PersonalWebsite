import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { RegisterComponent } from './components/register/register.component';

import { JwtInterceptor } from './helpers/jwt.interceptor';

import { AuthService } from './services/auth.service';
import { ValidationService } from './services/validation.service';

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        BlogComponent,
        HomeComponent,
        LoginComponent,
        NavbarComponent,
        PostComponent,
        RegisterComponent,
        PostEditorComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FlashMessagesModule.forRoot(),
        FormsModule,
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        AuthService,
        ValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
