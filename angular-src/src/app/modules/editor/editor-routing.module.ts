import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor.component';

import {
    PostEditorComponent
} from './components';

const routes: Routes = [
    {
        path: '',
        component: EditorComponent,
        children: [
            {
                path: '',
                component: PostEditorComponent
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
export class EditorRoutingModule { }