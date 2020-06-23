import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';

import {
    PostEditorComponent
} from './components';

@NgModule({
    declarations: [
        EditorComponent, 
        PostEditorComponent
    ],
    imports: [
        CommonModule,
        EditorRoutingModule, 
        FormsModule,
        ReactiveFormsModule
    ]
})
export class EditorModule { }
