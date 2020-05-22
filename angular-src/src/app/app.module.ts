import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AdminComponent } from './components/admin/admin.component';
import { BlogComponent } from './components/blog/blog.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { RegisterComponent } from './components/register/register.component';

import { JwtInterceptor } from './helpers/jwt.interceptor';

import { AuthService } from './services/auth.service';
import { ValidationService } from './services/validation.service';

// TODO: move all of this to app-routing.module.ts
const appRoutes: Routes = [
    { path: '',                     component: HomeComponent        },
    { path: 'admin',                component: AdminComponent       },
    { path: 'admin/login',          component: LoginComponent       },
    { path: 'admin/register',       component: RegisterComponent    },
    { path: 'blog',                 component: BlogComponent        },
    { path: 'blog/posts',           component: PostEditorComponent  },
    { path: 'blog/posts/:title',    component: PostComponent        },
    { 
        path: 'blog/categories/:categoryId',           
        component: PostEditorComponent  
    }
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
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        AuthService,
        ValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
