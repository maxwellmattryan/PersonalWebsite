import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { 
        path: '',
        pathMatch: 'full',
        loadChildren: 'modules/home/home.module#HomeModule'   
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
        loadChildren: 'modules/editor/editor.module#EditorModule'
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