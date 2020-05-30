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
import { RegisterComponent } from './components/register/register.component';

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
        RegisterComponent
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
