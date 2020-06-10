import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './components/editor/editor.component';
import { HomeComponent } from './components/home/home.component';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';

const routes: Routes = [
    // CAUTION: Children routes aren't used because the components themselves are not nested
    { 
        path: '',
        pathMatch: 'full',
        component: HomeComponent        
    },
    {
        path: 'admin',
        loadChildren: 'modules/admin/admin.module#AdminModule'
    },
    {
        path: 'blog',
        loadChildren: 'modules/blog/blog.module#BlogModule'
    },
    {
        path: 'editor',
        component: EditorComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }