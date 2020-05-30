import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { BlogComponent } from './components/blog/blog.component';
import { EditorComponent } from './components/editor/editor.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    // CAUTION: Children routes aren't used because the components themselves are not nested
    { path: '',                 component: HomeComponent },
    { path: 'admin',            component: AdminComponent },
    { path: 'admin/login',      component: LoginComponent },
    { path: 'admin/register',   component: RegisterComponent },
    { path: 'blog',             component: BlogComponent },
    { path: 'blog/posts/:uri',  component: PostComponent },
    { path: 'editor',           component: EditorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
