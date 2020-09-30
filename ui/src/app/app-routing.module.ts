import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { 
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('@app/modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('@app/modules/admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'blog',
        loadChildren: () => import('@app/modules/blog/blog.module').then(m => m.BlogModule)
    },
    {
        path: 'editor',
        loadChildren: () => import('@app/modules/editor/editor.module').then(m => m.EditorModule)
    },
    {
        path: 'portfolio',
        loadChildren: () => import('@app/modules/portfolio/portfolio.module').then(m => m.PortfolioModule)
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
            onSameUrlNavigation: 'reload',
            scrollPositionRestoration: 'top'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }