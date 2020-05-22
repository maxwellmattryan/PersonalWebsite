import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogComponent } from './components/blog/blog.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { RegisterComponent } from './components/register/register.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';

import { AuthService } from './services/auth.service';
import { ValidationService } from './services/validation.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin/register', component: RegisterComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'blog/posts', component: PostEditorComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        BlogComponent,
        CategoryComponent,
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
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        AuthService,
        ValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
