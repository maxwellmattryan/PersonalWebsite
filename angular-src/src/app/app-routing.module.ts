import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
