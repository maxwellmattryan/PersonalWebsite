import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopComponent } from './shop.component';

import {
    ShopCategoryEditorComponent,
    ShopProductEditorComponent,
    ShopViewComponent
} from './components';

const routes: Routes = [
    {
        path: '',
        component: ShopComponent,
        children: [
            {
                path: '',
                component: ShopViewComponent
            },
            {
                path: 'products/editor',
                component: ShopProductEditorComponent
            },
            {
                path: 'categories/editor',
                component: ShopCategoryEditorComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShopRoutingModule { }
