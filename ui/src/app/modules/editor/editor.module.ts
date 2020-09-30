import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@ui/modules';
import { SharedModule } from '@ui/shared/shared.module';

import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';

import {
    BlogPostEditorComponent,
    BlogTopicEditorComponent,
} from './components';

@NgModule({
    declarations: [
        EditorComponent, 
        BlogPostEditorComponent,
        BlogTopicEditorComponent,
    ],
    imports: [
        CommonModule,
        EditorRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class EditorModule { }
